import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Equipment } from '@prisma/client';

@Injectable()
export class EquipmentService {
  constructor(private prisma: PrismaService) {}

  async create(createEquipmentDto: CreateEquipmentDto): Promise<Equipment> {
    return this.prisma.equipment.create({
      data: createEquipmentDto,
    });
  }

  async findAll(): Promise<Equipment[]> {
    return this.prisma.equipment.findMany();
  }

  async findOne(id: string): Promise<Equipment> {
    const equipment = await this.prisma.equipment.findUnique({
      where: { id },
    });
    if (!equipment) {
      throw new NotFoundException(`Equipment with ID "${id}" not found.`);
    }
    return equipment;
  }

  async update(id: string, updateEquipmentDto: UpdateEquipmentDto): Promise<Equipment> {
    try {
      return await this.prisma.equipment.update({
        where: { id },
        data: updateEquipmentDto,
      });
    } catch (error) {
      if (error.code === 'P2025') { 
        throw new NotFoundException(`Equipment with ID "${id}" not found.`);
      }
      throw error;
    }
  }

  async remove(id: string): Promise<Equipment> {
    try {
      return await this.prisma.equipment.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Equipment with ID "${id}" not found.`);
      }
      throw error;
    }
  }
}
