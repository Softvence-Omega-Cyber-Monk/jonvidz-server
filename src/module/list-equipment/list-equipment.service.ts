import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateListEquipmentDto } from './dto/create-list-equipment.dto';
import { UpdateListEquipmentDto } from './dto/update-list-equipment.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ListEquipmentService {
  constructor(private prisma: PrismaService) {}

  // async create(createListEquipmentDto: CreateListEquipmentDto) {
  //   const data = await this.prisma.listOfEquipment.create({data:{createListEquipmentDto}})
  //   return data;
  // }

  async findAll() {
    return this.prisma.listOfEquipment.findMany({
      include: { assignEquipment:{include:{equipment:true}} },
      orderBy: { createdAt: 'desc' }
    });
  }

  async patientCareAssignmentById(id:string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const isExists = await this.prisma.listOfEquipment.findMany({where: { patientCareAssignmentId:id },include: { assignEquipment:{include:{equipment:true}} },});
    if (!isExists) {
      throw new NotFoundException(`Equipment with ID ${id} not found`);
    }
    return isExists;
  }
  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const data = await this.prisma.listOfEquipment.findUnique({ where: { id },include: { assignEquipment:{include:{equipment:true}} }, });
    return data;
  }

  async update(id: string, updateListEquipmentDto: UpdateListEquipmentDto) {
    if (!id) throw new BadRequestException('ID is required');

    return this.prisma.$transaction(async (tx) => {
      // 1) Update top-level ListOfEquipment fields
      const listOfEquipment = await tx.listOfEquipment.update({
        where: { id },
        data: {
          comments: updateListEquipmentDto.comments,
          signature: updateListEquipmentDto.signature,
          time_of_record: updateListEquipmentDto.time_of_record,
          full_e_cylinder: updateListEquipmentDto.full_e_cylinder,
          empty_e_cylinder: updateListEquipmentDto.empty_e_cylinder,
        },
      });

      // 2) Update nested AssignEquipment if provided
      if (updateListEquipmentDto.assignEquipment?.length) {
        for (const assign of updateListEquipmentDto.assignEquipment) {
          if (assign.id) {
            await tx.assignEquipment.update({
              where: { id: assign.id },
              data: {
                date: assign.date,
                status: assign.status,
              },
            });
          }
        }
      }

      // 3) Return updated ListOfEquipment with nested AssignEquipment
      return tx.listOfEquipment.findUnique({
        where: { id },
        include: { assignEquipment: true },
      });
    });
  }



  async remove(id: string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const data = await this.prisma.listOfEquipment.delete({where:{id:id}});
    return data;
  }
}
