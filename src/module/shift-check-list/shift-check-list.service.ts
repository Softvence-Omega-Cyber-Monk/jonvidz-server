import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateShiftCheckListDto } from './dto/create-shift-check-list.dto';
import { UpdateShiftCheckListDto } from './dto/update-shift-check-list.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ShiftCheckListService {
  constructor(private readonly prisma: PrismaService) {}
  
  async create(createShiftCheckListDto: CreateShiftCheckListDto) {
    const { categories, ...shiftCheckListData } = createShiftCheckListDto;
    return this.prisma.shiftCheckList.create({
      data: {
        ...shiftCheckListData,
        categories: {
          create: categories.map(category => ({
            name: category.name,
            displayOrder: category.displayOrder,
            items: {
              create: category.items.map(item => ({
                description: item.description,
                itemType: item.itemType,
                displayOrder: item.displayOrder,
                isRequired: item.isRequired,
                isChecked: item.isChecked,
                textResponse: item.textResponse,
                selectedOption: item.selectedOption,
              }))
            }
          }))
        }
      },
      include: {
        categories: {
          include: {
            items: true
          }
        }
      }
    });
  }

  async findAll() {
    return this.prisma.shiftCheckList.findMany();
  }

  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const isExists = await this.prisma.shiftCheckList.findUnique({
      where: { id }
    });
    if (!isExists) {
      throw new NotFoundException(`Shift CheckList with ID ${id} not found`);
    }
    return this.prisma.shiftCheckList.findUnique({where: {id: id}});
  }

  async update(id: string, updateShiftCheckListDto: UpdateShiftCheckListDto) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const isExists = await this.prisma.shiftCheckList.findUnique({
      where: { id }
    });
    if (!isExists) {
      throw new NotFoundException(`Shift CheckList with ID ${id} not found`);
    }
    return this.prisma.shiftCheckList.update({where: { id },data: updateShiftCheckListDto});
  }

  async remove(id: string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const isExists = await this.prisma.shiftCheckList.findUnique({
      where: { id }
    });
    if (!isExists) {
      throw new NotFoundException(`Shift CheckList with ID ${id} not found`);
    }
    return this.prisma.shiftCheckList.delete({where: {id: id}});
  }
}
