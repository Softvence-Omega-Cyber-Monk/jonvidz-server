import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { safeUserSelect } from '../user/dto/safeUserSelect';

@Injectable()
export class PatientService {
  constructor(private readonly prisma: PrismaService) {}
  // create(createPatientDto: CreatePatientDto) {
  //   return 'This action adds a new patient';
  // }

  async findAll() {
    // const data = await this.prisma.patient.findMany({include: {
    //     user: { select: safeUserSelect },
    //   },});
    const data = await this.prisma.patient.findMany({
      where: {
        user: {
          status: 'ACTIVE',
        },
      },
      include: {
        user: { select: safeUserSelect },
      },
    });
    return data;
  }

  async findOne(id: string) {
    const data = await this.prisma.patient.findUnique({where: { id },include: {
        patientCareAssignments: true, // <- returns full objects (all columns on that model)
        flow_sheet: {
          orderBy: { createdAt: 'desc' }, // newest first
          include: {
            off_vent_monitoring: true,
            measured_data: true,
            alarms_parameters: true,
            vent_setting: true,
            vital_parameters: true,
          },
        },
      },
    });
    return data;
  }

  async update(id: string,dto: UpdatePatientDto) {
    try {
      return await this.prisma.patient.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      // Handle the case where the ID does not exist
      if (error.code === 'P2025') {
        throw new NotFoundException(`Patient with ID "${id}" not found.`);
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.patient.delete({
        where: { id },
      });
    } catch (error) {
      // Handle the case where the ID does not exist
      if (error.code === 'P2025') {
        throw new NotFoundException(`Patient with ID "${id}" not found.`);
      }
      throw error;
    }
  }
}
