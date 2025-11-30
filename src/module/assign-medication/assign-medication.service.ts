import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAssignMedicationDto } from './dto/create-assign-medication.dto';
import { UpdateAssignMedicationDto } from './dto/update-assign-medication.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AssignMedicationService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateAssignMedicationDto) {
    if(!dto.medicationId ){
      throw new BadRequestException('medicationId is required');
    }
    if(!dto.marId ){
      throw new BadRequestException('marId is required');
    }

   const data = await this.prisma.listOfMadications.create({data:dto})
    return data
  }

  findAll() {
    return this.prisma.listOfMadications.findMany({include:{mar:true,medication:true}});
  }

  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const exists = await this.prisma.listOfMadications.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException(`Assignment ID ${id} not found`);
    }
    return this.prisma.listOfMadications.findUnique({where:{id:id},include:{mar:true,medication:true}});
  }

  async update(id: string, dto: UpdateAssignMedicationDto) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const exists = await this.prisma.listOfMadications.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException(`Assignment ID ${id} not found`);
    }
    const data = await this.prisma.listOfMadications.update({where:{id:id},data:dto});
    return data
  }

  async remove(id: string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const exists = await this.prisma.listOfMadications.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException(`Assignment ID ${id} not found`);
    }
    return this.prisma.listOfMadications.delete({where:{id:id}});
  }
}
