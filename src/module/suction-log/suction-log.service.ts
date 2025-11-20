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
  async create(dto: CreateSuctionLogDto) {
    console.log("dto----------------->",dto);
    const result = await this.prisma.$transaction(async (tx) => {
      // 1) create parent Suction
      const suctionLog = await tx.suctionLog.create({
        data: {
          patientId: dto.patientId,
          signature: dto.signature,
          comments: dto.comments,
        },
      });
      await tx.preSuctionVitals.create({data:{
          suctionLogId:suctionLog.id,
          patientId: dto.patientId,
        }})
      await tx.secretionsDescription.create({data:{
          suctionLogId:suctionLog.id,
          patientId: dto.patientId,
        }})

      await tx.postSuctionVitals.create({data:{
        suctionLogId:suctionLog.id,
        patientId: dto.patientId,
      }})

      // 3) Fetch and return the full FlowSheet including the child records
      const full = await tx.suctionLog.findUnique({
        where: { id: suctionLog.id },
        include: {
          pre_suction_vitals: true,
          secretions_description: true,
          post_suction_vitals: true,
        },
      });

      return full;
    }); // end transaction
  }


  async findAll() {
    const data = await this.prisma.suctionLog.findMany({
      include: {
        user: true, // Include user relation
        patient: true, // Include patient relation
        pre_suction_vitals: true, // Include pre-suction vitals
        secretions_description: true, // Include secretions description
        post_suction_vitals: true, // Include post-suction vitals
      },
      orderBy: {
        createdAt: 'desc', // Optional: order by creation date
      }
    });
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
    return this.prisma.suctionLog.findUnique({where: {id},include: {
        user: true, // Include user relation
        patient: true, // Include patient relation
        pre_suction_vitals: true, // Include pre-suction vitals
        secretions_description: true, // Include secretions description
        post_suction_vitals: true, // Include post-suction vitals
      },});
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
