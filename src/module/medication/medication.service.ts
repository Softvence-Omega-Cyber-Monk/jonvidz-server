import { Injectable,NotFoundException,BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Medication } from '@prisma/client';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { CreateListOfMedicationsDto } from './dto/createList-of-medications-dto';

@Injectable()
export class MedicationService {
  constructor(private prisma: PrismaService) {}

  async create(createMedicationDto: CreateMedicationDto): Promise<Medication> {
    // const isRouteExist = await this.prisma.medication.findFirst({
    //   where: { route: createMedicationDto.route },
    // });
    //
    // if (isRouteExist) {
    //   throw new BadRequestException('Medication route already exists');
    // }

    return this.prisma.medication.create({
      data: createMedicationDto,
    });
  }


  async findAll(): Promise<Medication[]> {
    return this.prisma.medication.findMany();
  }

  async findOne(id: string): Promise<Medication> {
    const medication = await this.prisma.medication.findUnique({
      where: { id },
    });
    if (!medication) {
      throw new NotFoundException(`Medication with ID "${id}" not found.`);
    }
    return medication;
  }

  async update(id: string, updateMedicationDto: UpdateMedicationDto): Promise<Medication> {
    try {
      return await this.prisma.medication.update({
        where: { id },
        data: updateMedicationDto,
      });
    } catch (error) {
      // Handle the case where the ID does not exist
      if (error.code === 'P2025') {
        throw new NotFoundException(`Medication with ID "${id}" not found.`);
      }
      throw error;
    }
  }

  // async assignMedication( id: string,dto:CreateListOfMedicationsDto) {
  //   return this.prisma.listOfMadications.update({
  //     where: { id },
  //     data: dto,
  //   })
  // }
  async remove(id: string): Promise<Medication> {
    try {
      return await this.prisma.medication.delete({
        where: { id },
      });
    } catch (error) {
      // Handle the case where the ID does not exist
      if (error.code === 'P2025') {
        throw new NotFoundException(`Medication with ID "${id}" not found.`);
      }
      throw error;
    }
  }
}