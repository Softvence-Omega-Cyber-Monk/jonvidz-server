import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateMarDto } from './dto/update-mar.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MarService {
  constructor(private prisma: PrismaService) {}
  // async create(dto: CreateMarDto) {
  //   if (!dto.patientId){
  //     throw new BadRequestException('patientId is required');
  //   }
  //   if (!dto.patientCareAssignmentId){
  //     throw new BadRequestException('patientCareAssignmentId is required');
  //   }
  //   if (!dto.medicationId){
  //     throw new BadRequestException('medicationId is required');
  //   }
  //   return this.prisma.mAR.create({data: {
  //     patientId:dto.patientId, patientCareAssignmentId:dto.patientCareAssignmentId,medicationId:dto.medicationId
  //     }});
  // }

  findAll() {
    return this.prisma.mAR.findMany({
      include: {
        listOfMadications: {
          include: {
            medication: true,
          },
        },
      },
    });
  }

  async patientCareAssignmentById(id:string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const isExists = await this.prisma.mAR.findMany({
      where: { patientCareAssignmentId:id }
    });
    if (!isExists) {
      throw new NotFoundException(`MAR with ID ${id} not found`);
    }
    return this.prisma.mAR.findMany({where: { patientCareAssignmentId:id },
      include: {
        listOfMadications: {
          include: {
            medication: true,
          },
        },
      },});
  }

  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const isExists = await this.prisma.mAR.findUnique({
      where: { id }
    });
    if (!isExists) {
      throw new NotFoundException(`MAR with ID ${id} not found`);
    }
    return this.prisma.mAR.findUnique({where: {id}, include: {
        listOfMadications: {
          include: {
            medication: true,
          },
        },
      },});
  }

  async updateMar(id: string, updateMarDto: UpdateMarDto) {
    const existingMar = await this.prisma.mAR.findUnique({
      where: { id },
      include: { listOfMadications: true },
    });

    if (!existingMar) {
      throw new NotFoundException(`MAR with ID ${id} not found`);
    }

    // Start a transaction to update MAR + nested medications
    return this.prisma.$transaction(async (tx) => {
      // 1) Update top-level MAR fields
      const mar = await tx.mAR.update({
        where: { id },
        data: {
          comments: updateMarDto.comments,
          signature: updateMarDto.signature,
          time_of_record: updateMarDto.time_of_record,
          full_e_cylinder: updateMarDto.full_e_cylinder,
          empty_e_cylinder: updateMarDto.empty_e_cylinder,
        },
      });

      // 2) Update nested ListOfMedications if provided
      if (updateMarDto.listOfMadications && updateMarDto.listOfMadications.length) {
        for (let i = 0; i < updateMarDto.listOfMadications.length; i++) {
          const medUpdate = updateMarDto.listOfMadications[i];
          if (medUpdate.id) {
            await tx.listOfMadications.update({
              where: { id: medUpdate.id },
              data: {
                time_of_record: medUpdate.time_of_record,
                schedule: medUpdate.schedule,
                status: medUpdate.status,
                isCheck: medUpdate.isCheck,
                comments: medUpdate.comments,
              },
            });
          }
        }
      }

      // Return updated MAR with nested medications
      return tx.mAR.findUnique({
        where: { id },
        include: {
          listOfMadications: { include: { medication: true } },
        },
      });
    });
  }


  async remove(id: string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const isExists = await this.prisma.mAR.findUnique({
      where: { id }
    });
    if (!isExists) {
      throw new NotFoundException(`MAR with ID ${id} not found`);
    }
    return this.prisma.mAR.delete({where: {id}});
  }
}
