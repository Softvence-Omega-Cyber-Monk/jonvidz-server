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
    //console.log("dto----------------->",dto);
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

    const { pre_suction_vitals, secretions_description, post_suction_vitals, ...mainData } = updateSuctionLogDto;

    return this.prisma.$transaction(async (prisma) => {
      // Update main suction log
      await prisma.suctionLog.update({
        where: { id },
        data: mainData,
      });

      // Update pre-suction vitals if provided
      if (pre_suction_vitals) {
        if (pre_suction_vitals.id) {
          // Update existing pre-suction vital
          await prisma.preSuctionVitals.update({
            where: { id: pre_suction_vitals.id },
            data: {
              spO2Percent: pre_suction_vitals.spO2Percent,
              hr_bpm: pre_suction_vitals.hr_bpm,
              pr_bpm: pre_suction_vitals.pr_bpm,
              checkedSuctionVital: pre_suction_vitals.checkedSuctionVital,
              checked: pre_suction_vitals.checked,
            },
          });
        } else {
          // Create new pre-suction vital
          await prisma.preSuctionVitals.create({
            data: {
              suctionLogId: id,
              patientId: isExists.patientId,
              spO2Percent: pre_suction_vitals.spO2Percent,
              hr_bpm: pre_suction_vitals.hr_bpm,
              pr_bpm: pre_suction_vitals.pr_bpm,
              checkedSuctionVital: pre_suction_vitals.checkedSuctionVital,
              checked: pre_suction_vitals.checked,
            },
          });
        }
      }

      // Update secretions description if provided
      if (secretions_description) {
        if (secretions_description.id) {
          // Update existing secretions description
          await prisma.secretionsDescription.update({
            where: { id: secretions_description.id },
            data: {
              color: secretions_description.color,
              consistency: secretions_description.consistency,
              amount: secretions_description.amount,
            },
          });
        } else {
          // Create new secretions description
          await prisma.secretionsDescription.create({
            data: {
              suctionLogId: id,
              patientId: isExists.patientId,
              color: secretions_description.color,
              consistency: secretions_description.consistency,
              amount: secretions_description.amount,
            },
          });
        }
      }

      // Update post-suction vitals if provided
      if (post_suction_vitals) {
        if (post_suction_vitals.id) {
          // Update existing post-suction vital
          await prisma.postSuctionVitals.update({
            where: { id: post_suction_vitals.id },
            data: {
              sp_o2: post_suction_vitals.sp_o2,
              hr_bpm: post_suction_vitals.hr_bpm,
              pr_bpm: post_suction_vitals.pr_bpm,
              checked: post_suction_vitals.checked,
            },
          });
        } else {
          // Create new post-suction vital
          await prisma.postSuctionVitals.create({
            data: {
              suctionLogId: id,
              patientId: isExists.patientId,
              sp_o2: post_suction_vitals.sp_o2,
              hr_bpm: post_suction_vitals.hr_bpm,
              pr_bpm: post_suction_vitals.pr_bpm,
              checked: post_suction_vitals.checked,
            },
          });
        }
      }

      // Return updated suction log with all relations
      return prisma.suctionLog.findUnique({
        where: { id },
        include: {
          pre_suction_vitals: true,
          secretions_description: true,
          post_suction_vitals: true,
        },
      });
    });
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
