import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSuctionLogDto } from './dto/create-suction-log.dto';
import { UpdateSuctionLogDto } from './dto/update-suction-log.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SuctionLogService {
  constructor(private prisma: PrismaService) {}
  create(createSuctionLogDto: CreateSuctionLogDto) {
    return 'This action adds a new suctionLog';
  }

  async findAll() {
    const data = await this.prisma.suctionLog.findMany();
    return data;
  }

  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const isExists = await this.prisma.suctionLog.findUnique({
      where: { id }
    });
    if (!isExists) {
      throw new NotFoundException(`Suction Log with ID ${id} not found`);
    }
    return this.prisma.suctionLog.findUnique({where: {id}});
  }

  async update(id: string, updateSuctionLogDto: UpdateSuctionLogDto) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const isExists = await this.prisma.suctionLog.findUnique({
      where: { id }
    });
    if (!isExists) {
      throw new NotFoundException(`Suction Log with ID ${id} not found`);
    }
    return this.prisma.suctionLog.update({where: { id },
      data: updateSuctionLogDto,});
  }

  async remove(id: string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const isExists = await this.prisma.suctionLog.findUnique({
      where: { id }
    });
    if (!isExists) {
      throw new NotFoundException(`Suction Log with ID ${id} not found`);
    }
    return this.prisma.suctionLog.delete({where: {id}});
  }
}
