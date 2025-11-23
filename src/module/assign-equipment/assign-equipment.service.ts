import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAssignEquipmentDto } from './dto/create-assign-equipment.dto';
import { UpdateAssignEquipmentDto } from './dto/update-assign-equipment.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AssignEquipmentService {
  constructor(private prisma: PrismaService) {}

  async create(createAssignEquipmentDto: CreateAssignEquipmentDto) {
    if(!createAssignEquipmentDto.equipmentId) {
      throw new BadRequestException('equipmentId is required');
    }
    if(!createAssignEquipmentDto.listOfEquipmentId) {
      throw new BadRequestException('listOfEquipmentId is required');
    }
    const data = await this.prisma.assignEquipment.create({data: createAssignEquipmentDto});
    return data;
  }

  async findAll() {
    const data = await this.prisma.assignEquipment.findMany()
    return data;
  }

  async findOne(id: string) {
    if(!id) {
      throw new BadRequestException('id is required');
    }
    const data = await this.prisma.assignEquipment.findUnique({ where: { id: id } });
    return data;
  }

  async update(id: string, updateAssignEquipmentDto: UpdateAssignEquipmentDto) {
    if(!id) {
      throw new BadRequestException('id is required');
    }
    const data = await this.prisma.assignEquipment.update({where: { id },data: updateAssignEquipmentDto});
    return data;
  }

  async remove(id: string) {
    if(!id) {
      throw new BadRequestException('id is required');
    }
    const data = await this.prisma.assignEquipment.delete({where: { id }})
    return data;
  }
}
