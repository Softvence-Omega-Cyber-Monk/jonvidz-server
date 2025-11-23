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
    const data = await this.prisma.assignEquipment.findMany({include: {
        equipment: true
      },})
    return data;
  }

  async findOne(id: string) {
    if(!id) {
      throw new BadRequestException('id is required');
    }
    const data = await this.prisma.assignEquipment.findUnique({ where: { id: id },include: {
        equipment: true
      }, });
    return data;
  }

  // async update(id: string, dto: UpdateAssignEquipmentDto) {
  //   if (!id) throw new BadRequestException('id is required');
  //
  //   const data =await this.prisma.assignEquipment.update({where:{id: id},data:dto});
  //   return data;
  // }

  async update(id: string, dto: UpdateAssignEquipmentDto) {
    if (!id) throw new BadRequestException('ID is required');

    const updated = await this.prisma.assignEquipment.update({
      where: { id },
      data: {
        date: dto.date,
        status: dto.status,
        equipment: dto.equipment
          ? {
            update: {
              name: dto.equipment.name,
              standard_frequency: dto.equipment.standard_frequency,
              notes_or_purpose: dto.equipment.notes_or_purpose,
            },
          }
          : undefined,
      },
      include: {
        equipment: true,
      },
    });

    return {
      statusCode: 200,
      success: true,
      message: 'Assign Equipment updated successfully.',
      data: updated,
    };
  }

  async remove(id: string) {
    if(!id) {
      throw new BadRequestException('id is required');
    }
    const data = await this.prisma.assignEquipment.delete({where: { id }})
    return data;
  }
}
