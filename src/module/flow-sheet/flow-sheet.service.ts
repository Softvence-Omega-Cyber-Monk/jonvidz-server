import { Injectable, NotFoundException, BadRequestException,ConflictException,InternalServerErrorException } from '@nestjs/common';
import { CreateFlowSheetDto } from './dto/create-flow-sheet.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Response } from 'express';

@Injectable()
export class FlowSheetService {
  constructor(private prisma: PrismaService) {}

  async create(createFlowSheetDto: CreateFlowSheetDto) {
    const data = await this.prisma.flowSheet.create({data: createFlowSheetDto});
    return data;
  }

  async findAll() {
    return this.prisma.flowSheet.findMany({ orderBy: { createdAt: 'desc' }, // newest first
      include: {
        off_vent_monitoring: true,
        measured_data: true,
        alarms_parameters: true,
        vent_setting: true,
        vital_parameters: true,
      },});
  }

  async patientCareAssignmentById(id: string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const isExists = await this.prisma.flowSheet.findUnique({
      where: { patientCareAssignmentId:id }
    });
    if (!isExists) {
      throw new NotFoundException(`FlowSheet with ID ${id} not found`);
    }
    return this.prisma.flowSheet.findUnique({where: { patientCareAssignmentId:id }, include: {
        off_vent_monitoring: true,
        measured_data: true,
        alarms_parameters: true,
        vent_setting: true,
        vital_parameters: true,
      }});
  }
  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const isExists = await this.prisma.flowSheet.findUnique({
      where: { id }
    });
    if (!isExists) {
      throw new NotFoundException(`FlowSheet with ID ${id} not found`);
    }
    return this.prisma.flowSheet.findUnique({where: { id }, include: {
        off_vent_monitoring: true,
        measured_data: true,
        alarms_parameters: true,
        vent_setting: true,
        vital_parameters: true,
      }});
  }

  // async update(id: string, dto: UpdateFlowSheetDto) {
  //   if (!id) {
  //     throw new BadRequestException('ID is required');
  //   }
  //   const isExists = await this.prisma.flowSheet.findUnique({
  //     where: { id }
  //   });
  //   if (!isExists) {
  //     throw new NotFoundException(`FlowSheet with ID ${id} not found`);
  //   }
  //   const data = await this.prisma.flowSheet.update({where: { id },
  //     data: dto,})
  //   return data;
  // }
  async update(id: string, updateFlowSheetDto: any) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }

    // Check if flow sheet exists
    const existingFlowSheet = await this.prisma.flowSheet.findUnique({
      where: { id }
    });

    if (!existingFlowSheet) {
      throw new NotFoundException(`FlowSheet with ID ${id} not found`);
    }

    // Use transaction to update all related records
    return this.prisma.$transaction(async (prisma) => {
      // Extract main flow sheet data (excluding nested relations)
      const {
        off_vent_monitoring,
        measured_data,
        alarms_parameters,
        vent_setting,
        vital_parameters,
        ...flowSheetData
      } = updateFlowSheetDto;

      // Update main flow sheet
      const updatedFlowSheet = await prisma.flowSheet.update({
        where: { id },
        data: flowSheetData,
        include: {
          off_vent_monitoring: true,
          measured_data: true,
          alarms_parameters: true,
          vent_setting: true,
          vital_parameters: true,
        }
      });

      // Update related records if provided
      if (off_vent_monitoring) {
        await prisma.offVentMonitoring.upsert({
          where: { flowSheetId: id },
          update: off_vent_monitoring,
          create: {
            ...off_vent_monitoring,
            flowSheetId: id,
            patientId: existingFlowSheet.patientId,
          }
        });
      }

      if (measured_data) {
        await prisma.measuredData.upsert({
          where: { flowSheetId: id },
          update: measured_data,
          create: {
            ...measured_data,
            flowSheetId: id,
            patientId: existingFlowSheet.patientId,
          }
        });
      }

      if (alarms_parameters) {
        await prisma.alarmsParameters.upsert({
          where: { flowSheetId: id },
          update: alarms_parameters,
          create: {
            ...alarms_parameters,
            flowSheetId: id,
            patientId: existingFlowSheet.patientId,
          }
        });
      }

      if (vent_setting) {
        await prisma.ventSetting.upsert({
          where: { flowSheetId: id },
          update: vent_setting,
          create: {
            ...vent_setting,
            flowSheetId: id,
            patientId: existingFlowSheet.patientId,
          }
        });
      }

      if (vital_parameters) {
        await prisma.vitalParameters.upsert({
          where: { flowSheetId: id },
          update: vital_parameters,
          create: {
            ...vital_parameters,
            flowSheetId: id,
            patientId: existingFlowSheet.patientId,
          }
        });
      }

      // Return the updated flow sheet with all relations
      return prisma.flowSheet.findUnique({
        where: { id },
        include: {
          off_vent_monitoring: true,
          measured_data: true,
          alarms_parameters: true,
          vent_setting: true,
          vital_parameters: true,
        }
      });
    });
  }
  async remove(id: string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    try {
      const isExists = await this.prisma.flowSheet.findUnique({
        where: { id }
      });
      if (!isExists) {
        throw new NotFoundException(`FlowSheet with ID ${id} not found`);
      }

      return await this.prisma.flowSheet.delete({
        where: { id }
      });

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw NotFoundException as is
      }
      // Handle Prisma specific errors
      if (error.code === 'P2025') {
        // Record to delete does not exist
        throw new NotFoundException(`FlowSheet with ID ${id} not found`);
      }
      if (error.code === 'P2003') {
        // Foreign key constraint violation
        throw new ConflictException('Cannot delete FlowSheet due to existing references');
      }
      // Log unexpected errors
      console.error(`Failed to delete FlowSheet ${id}: ${error}`);

      throw new InternalServerErrorException('Failed to delete FlowSheet');
    }
  }
}
