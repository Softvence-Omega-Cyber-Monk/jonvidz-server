import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateShiftCheckListDto } from './dto/create-shift-check-list.dto';
import { PrismaService } from '../../prisma/prisma.service';
import {STOMA_SITE_CARE,STOMA_SITE_CONDITION,RESPIRATORY_EQUIPMENT_TEMPLATE,OXYGEN_INFECTION_CONTROL} from '../../constants/checklist-templates'
import { UpdateShiftCheckListDto } from './dto/update-shift-check-list.dto';


@Injectable()
export class ShiftCheckListService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createShiftCheckListDto: CreateShiftCheckListDto) {
    const { categories = [], ...shiftCheckListData } = createShiftCheckListDto;

    // Combine static templates with dynamic categories
    const allCategories = [
      // Static Template: Respiratory Equipment
      {
        name: "Respiratory Equipment",
        selectType:"",
        displayOrder: 1,
        items: {
          create: RESPIRATORY_EQUIPMENT_TEMPLATE.map(item => ({
            ...item,
            isChecked: false // Always start as unchecked
          }))
        }
      },
      // Static Template: Stoma Site Care
      {
        name: "Stoma Site Care",
        selectType:"",
        displayOrder: 2,
        items: {
          create: STOMA_SITE_CARE.map(item => ({
            ...item,
            isChecked: false
          }))
        }
      },
      // Static Template: Stoma Site Condition
      {
        name: "Stoma Site Condition",
        selectType:"",
        displayOrder: 3,
        items: {
          create: STOMA_SITE_CONDITION.map(item => ({
            ...item,
            isChecked: false
          }))
        }
      },
      // Static Template: Oxygen & Infection Control
      {
        name: "Oxygen & Infection Control",
        selectType:"",
        displayOrder: 4,
        items: {
          create: OXYGEN_INFECTION_CONTROL.map(item => ({
            ...item,
            isChecked: false
          }))
        }
      },
      // Dynamic categories from request (if any)
      ...categories.map(category => ({
        name: category.name,
        displayOrder: Number(category.displayOrder)+1, // Start after static templates
        items: {
          create: category.items.map(item => ({
            description: item.description,
            itemType: item.itemType || 'checkbox',
            displayOrder: item.displayOrder,
            isRequired: item.isRequired,
            isChecked: item.isChecked || false,
            // Remove textResponse and selectedOption since they're not in your schema
          }))
        }
      }))
    ];

    return this.prisma.shiftCheckList.create({
      data: {
        ...shiftCheckListData,
        categories: {
          create: allCategories
        }
      },
      include: {
        categories: {
          include: {
            items: {
              orderBy: {
                displayOrder: 'asc'
              }
            }
          },
          orderBy: {
            displayOrder: 'asc'
          }
        }
      }
    });
  }

  async findAll() {
    return this.prisma.shiftCheckList.findMany({
      include: {
        categories: {
          include: {
            items: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
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
    return this.prisma.shiftCheckList.findUnique(
      {where: {id: id},
        include: {
        categories: {
          include: {
            items: true
          }
        }
      }});
  }

  // async update(id: string, updateShiftCheckListDto: any) {
  //   console.log("updateShiftCheckListDto--------------->",updateShiftCheckListDto);
  //   if (!id) {
  //     throw new BadRequestException('ID is required');
  //   }
  //
  //   const existingChecklist = await this.prisma.shiftCheckList.findUnique({
  //     where: { id }
  //   });
  //
  //   if (!existingChecklist) {
  //     throw new NotFoundException(`Shift CheckList with ID ${id} not found`);
  //   }
  //
  //   const { categories, ...shiftCheckListData } = updateShiftCheckListDto;
  //
  //   return this.prisma.$transaction(async (prisma) => {
  //     // Update main shift checklist
  //     await prisma.shiftCheckList.update({
  //       where: { id },
  //       data: shiftCheckListData,
  //     });
  //
  //     // Update item check status if provided
  //     if (categories) {
  //       for (const category of categories) {
  //         if (category.items) {
  //           for (const item of category.items) {
  //             if (item.id && item.isChecked !== undefined) {
  //               await prisma.checklistItem.update({
  //                 where: { id: item.id },
  //                 data: { isChecked: item.isChecked }
  //               });
  //             }
  //           }
  //         }
  //       }
  //     }
  //
  //     // Return updated checklist
  //     return prisma.shiftCheckList.findUnique({
  //       where: { id },
  //       include: {
  //         categories: {
  //           include: {
  //             items: {
  //               orderBy: { displayOrder: 'asc' }
  //             }
  //           },
  //           orderBy: { displayOrder: 'asc' }
  //         }
  //       }
  //     });
  //   });
  // }

  async update(id: string, updateShiftCheckListDto: UpdateShiftCheckListDto) {
    //console.log("updateShiftCheckListDto--------------->", updateShiftCheckListDto);
    if (!id) {
      throw new BadRequestException('ID is required');
    }

    const existingChecklist = await this.prisma.shiftCheckList.findUnique({
      where: { id }
    });

    if (!existingChecklist) {
      throw new NotFoundException(`Shift CheckList with ID ${id} not found`);
    }

    const { categories, ...shiftCheckListData } = updateShiftCheckListDto;

    return this.prisma.$transaction(async (prisma) => {
      // Update main shift checklist
      await prisma.shiftCheckList.update({
        where: { id },
        data: shiftCheckListData,
      });

      // Update categories and items if provided
      if (categories) {
        for (const category of categories) {
          // Update category if it has an ID
          if (category.id) {
            await prisma.checklistCategory.update({
              where: { id: category.id },
              data: {
                selectType: category.selectType,
                name: category.name,
                displayOrder: category.displayOrder,
              },
            });
          }

          // Update items if provided
          if (category.items) {
            for (const item of category.items) {
              if (item.id) {
                await prisma.checklistItem.update({
                  where: { id: item.id },
                  data: {
                    description: item.description,
                    displayOrder: item.displayOrder,
                    isRequired: item.isRequired,
                    isChecked: item.isChecked,
                    itemType: item.itemType,
                  }
                });
              }
            }
          }
        }
      }

      // Return updated checklist
      return prisma.shiftCheckList.findUnique({
        where: { id },
        include: {
          categories: {
            include: {
              items: {
                orderBy: { displayOrder: 'asc' }
              }
            },
            orderBy: { displayOrder: 'asc' }
          }
        }
      });
    });
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
