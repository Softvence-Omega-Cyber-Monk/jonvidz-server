import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateStandardVitalRangeDto } from './dto/create-standard_vital_range.dto';
import { UpdateStandardVitalRangeDto } from './dto/update-standard_vital_range.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { StandardVitalRange } from '@prisma/client';

@Injectable()
export class StandardVitalRangeService {
  constructor(private prisma: PrismaService) {}

  async create(createStandardVitalRangeDto: CreateStandardVitalRangeDto): Promise<StandardVitalRange> {
    return this.prisma.standardVitalRange.create({
      data: createStandardVitalRangeDto,
    });
  }

  async findAll(): Promise<StandardVitalRange[]> {
    return this.prisma.standardVitalRange.findMany();
  }

  // Find by ID (UUID string)
  async findOne(id: string): Promise<StandardVitalRange> {
    const range = await this.prisma.standardVitalRange.findUnique({
      where: { id },
    });
    if (!range) {
      throw new NotFoundException(`Standard Vital Range with ID "${id}" not found.`);
    }
    return range;
  }

  async update(id: string, updateStandardVitalRangeDto: UpdateStandardVitalRangeDto): Promise<StandardVitalRange> {
    try {
      return await this.prisma.standardVitalRange.update({
        where: { id },
        data: updateStandardVitalRangeDto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Standard Vital Range with ID "${id}" not found.`);
      }
      throw error;
    }
  }

  async remove(id: string): Promise<StandardVitalRange> {
    try {
      return await this.prisma.standardVitalRange.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Standard Vital Range with ID "${id}" not found.`);
      }
      throw error;
    }
  }
}
