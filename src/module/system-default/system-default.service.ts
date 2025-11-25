import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSystemDefaultDto } from './dto/create-system-default.dto';
import { UpdateSystemDefaultDto } from './dto/update-system-default.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SystemDefaultService {
  constructor(private prisma: PrismaService) {}

  create(createSystemDefaultDto: CreateSystemDefaultDto) {
    return 'This action adds a new systemDefault';
  }

  async findAll() {
    const data = await this.prisma.systemConfig.findMany()
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} systemDefault`;
  }

  async update(id: string, dto: UpdateSystemDefaultDto) {
    if(!id){
      throw new NotFoundException(`id ${id} not found`);
    }
    return this.prisma.systemConfig.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return `This action removes a #${id} systemDefault`;
  }
}
/*

// RetentionService.ts (Cron Job)
import { Cron, CronExpression } from '@nestjs/schedule';

// Runs every day at a low-traffic time
@Cron(CronExpression.CRON_1AM)
async handleDataRetention() {
    // ... get retentionDays from DB ...
    const cutoffDate = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);

    const result = await this.prisma.clinicalChart.updateMany({
        where: { createdAt: { lt: cutoffDate }, isArchived: false },
        data: { isArchived: true }, // Set archive flag
    });
    // ... log result ...
}

 */