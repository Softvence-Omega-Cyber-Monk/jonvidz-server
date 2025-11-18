import { Injectable,BadRequestException,NotFoundException } from '@nestjs/common';
import { UpdateOffVentMonitoringDto } from './dto/update-off-vent-monitoring.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OffVentMonitoringService {
  constructor(private readonly prisma: PrismaService) {}
  // create(createOffVentMonitoringDto: CreateOffVentMonitoringDto) {
  //   return 'This action adds a new offVentMonitoring';
  // }

  async findAll() {
    return this.prisma.offVentMonitoring.findMany();
  }

  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const isExists = await this.prisma.offVentMonitoring.findUnique({
      where: { id }
    });
    if (!isExists) {
      throw new NotFoundException(`offVentMonitoring with ID ${id} not found`);
    }
    return this.prisma.offVentMonitoring.findUnique({ where: { id } });
  }

  async update(id: string, dto: UpdateOffVentMonitoringDto) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const isExists = await this.prisma.offVentMonitoring.findUnique({
      where: { id }
    });
    if (!isExists) {
      throw new NotFoundException(`offVentMonitoring with ID ${id} not found`);
    }
    return this.prisma.offVentMonitoring.update({where: { id }, data: dto,});
  }

  async remove(id: string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const isExists = await this.prisma.offVentMonitoring.findUnique({
      where: { id }
    });
    if (!isExists) {
      throw new NotFoundException(`offVentMonitoring with ID ${id} not found`);
    }
    return this.prisma.offVentMonitoring.delete({where: { id }});
  }
}
