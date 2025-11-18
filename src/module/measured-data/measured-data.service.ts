import { Injectable,NotFoundException,BadRequestException } from '@nestjs/common';
import { CreateMeasuredDatumDto } from './dto/create-measured-datum.dto';
import { UpdateMeasuredDatumDto } from './dto/update-measured-datum.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MeasuredDataService {
  constructor(private prisma: PrismaService) {}
  create(createMeasuredDatumDto: CreateMeasuredDatumDto) {
    return 'This action adds a new measuredDatum';
  }

  async findAll() {
    return this.prisma.measuredData.findMany();
  }

  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const isExists = await this.prisma.measuredData.findUnique({
      where: { id }
    });
    if (!isExists) {
      throw new NotFoundException(`measuredDatum with ID ${id} not found`);
    }
    return this.prisma.measuredData.findUnique({where: { id }});
  }

  async update(id: string, dto: UpdateMeasuredDatumDto) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const isExists = await this.prisma.measuredData.findUnique({
      where: { id }
    });
    if (!isExists) {
      throw new NotFoundException(`measuredDatum with ID ${id} not found`);
    }
    return this.prisma.measuredData.update({where: { id }, data: dto,});
  }

  async remove(id: string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const isExists = await this.prisma.measuredData.findUnique({
      where: { id }
    });
    if (!isExists) {
      throw new NotFoundException(`measuredDatum with ID ${id} not found`);
    }
    return this.prisma.measuredData.delete({where: { id }});
  }
}
