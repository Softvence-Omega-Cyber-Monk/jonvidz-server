import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { safeUserSelect } from '../user/dto/safeUserSelect';

@Injectable()
export class StaffService {
  constructor(private readonly prisma: PrismaService) {}
  // create(createStaffDto: CreateStaffDto) {
  //   return 'This action adds a new staff';
  // }

  async findAll() {
    const data = await this.prisma.staff.findMany({
      include: {
        user: { select: safeUserSelect },
      },
    });
    return data;
  }

  async findOne(id: string) {
    const data = await this.prisma.staff.findUnique({where: { id }});
    return data;
  }

  async update(id: string, dto: UpdateStaffDto) {
    try {
      return await this.prisma.staff.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      // Handle the case where the ID does not exist
      if (error.code === 'P2025') {
        throw new NotFoundException(`Staff with ID "${id}" not found.`);
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.staff.delete({
        where: { id },
      });
    } catch (error) {
      // Handle the case where the ID does not exist
      if (error.code === 'P2025') {
        throw new NotFoundException(`Staff with ID "${id}" not found.`);
      }
      throw error;
    }
  }
}
