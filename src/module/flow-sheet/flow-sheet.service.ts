import { Injectable, NotFoundException, BadRequestException,ConflictException,InternalServerErrorException } from '@nestjs/common';
import { CreateFlowSheetDto } from './dto/create-flow-sheet.dto';
import { UpdateFlowSheetDto } from './dto/update-flow-sheet.dto';
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

  async update(id: string, dto: UpdateFlowSheetDto) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const isExists = await this.prisma.flowSheet.findUnique({
      where: { id }
    });
    if (!isExists) {
      throw new NotFoundException(`FlowSheet with ID ${id} not found`);
    }
    const data = await this.prisma.flowSheet.update({where: { id },
      data: dto,})
    return data;
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
