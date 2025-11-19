import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMarDto } from './dto/create-mar.dto';
import { UpdateMarDto } from './dto/update-mar.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MarService {
  constructor(private prisma: PrismaService) {}
  create(createMarDto: CreateMarDto) {
    return 'This action adds a new mar';
  }

  findAll() {
    return this.prisma.mAR.findMany();
  }

  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const isExists = await this.prisma.mAR.findUnique({
      where: { id }
    });
    if (!isExists) {
      throw new NotFoundException(`MAR with ID ${id} not found`);
    }
    return this.prisma.mAR.findUnique({where: {id}});
  }

  async update(id: string, updateMarDto: UpdateMarDto) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const isExists = await this.prisma.mAR.findUnique({
      where: { id }
    });
    if (!isExists) {
      throw new NotFoundException(`MAR with ID ${id} not found`);
    }
    return this.prisma.mAR.update({
      where: { id },
      data: updateMarDto,
    })
  }

  async remove(id: string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const isExists = await this.prisma.mAR.findUnique({
      where: { id }
    });
    if (!isExists) {
      throw new NotFoundException(`MAR with ID ${id} not found`);
    }
    return this.prisma.mAR.delete({where: {id}});
  }
}
