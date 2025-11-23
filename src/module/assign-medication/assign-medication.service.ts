import { Injectable } from '@nestjs/common';
import { CreateAssignMedicationDto } from './dto/create-assign-medication.dto';
import { UpdateAssignMedicationDto } from './dto/update-assign-medication.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AssignMedicationService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateAssignMedicationDto) {
   const data = await this.prisma.listOfMadications.create({data:dto})
    return data
  }

  findAll() {
    return `This action returns all assignMedication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} assignMedication`;
  }

  update(id: number, updateAssignMedicationDto: UpdateAssignMedicationDto) {
    return `This action updates a #${id} assignMedication`;
  }

  remove(id: number) {
    return `This action removes a #${id} assignMedication`;
  }
}
