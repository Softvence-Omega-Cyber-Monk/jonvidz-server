import { Injectable } from '@nestjs/common';
import { CreateFlowSheetDto } from './dto/create-flow-sheet.dto';
import { UpdateFlowSheetDto } from './dto/update-flow-sheet.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FlowSheetService {
  constructor(private prisma: PrismaService) {}

  async create(createFlowSheetDto: CreateFlowSheetDto) {
    const data = await this.prisma.flowSheet.create({data: createFlowSheetDto});
    return data;
  }

  findAll() {
    return `This action returns all flowSheet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} flowSheet`;
  }

  update(id: number, updateFlowSheetDto: UpdateFlowSheetDto) {
    return `This action updates a #${id} flowSheet`;
  }

  remove(id: number) {
    return `This action removes a #${id} flowSheet`;
  }
}
