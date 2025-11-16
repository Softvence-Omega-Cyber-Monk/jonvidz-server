import { Injectable ,NotFoundException} from '@nestjs/common';
import { CreateAuditLogDto } from './dto/create-audit_log.dto';
import { UpdateAuditLogDto } from './dto/update-audit_log.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditLog } from '@prisma/client';
import { safeUserSelect } from "../user/dto/safeUserSelect";

@Injectable()
export class AuditLogService {
  constructor(private prisma: PrismaService) {}

  async create(createAuditLogDto: CreateAuditLogDto): Promise<AuditLog> {
    const { userId, patientId, eventType, details } = createAuditLogDto;

    return this.prisma.auditLog.create({
      data: {
        userId,
        eventType,
        details,
        patientId: patientId || null,
      },
    });
  }


  async findAll(): Promise<AuditLog[]> {
    return this.prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      include: {  user: { select: safeUserSelect }, patient: true },
    });
  }


  async findOne(id: string): Promise<AuditLog> {
    const log = await this.prisma.auditLog.findUnique({
      where: { id },
      include: {
        user: { select: safeUserSelect },
        patient: true
      },
    });

    if (!log) {
      throw new NotFoundException(`Audit Log with ID "${id}" not found.`);
    }

    return log;
  }

  // U - Update Operation
  async update(id: string, updateAuditLogDto: UpdateAuditLogDto): Promise<AuditLog> {
    try {
      return await this.prisma.auditLog.update({
        where: { id },
        data: updateAuditLogDto,
      });
    } catch (error) {
      console.log(error);
      throw new NotFoundException(`Audit Log with ID "${id}" not found.`);
    }
  }


  async remove(id: string): Promise<AuditLog> {
    try {
      return await this.prisma.auditLog.delete({
        where: { id },
      });
    } catch (error) {
      console.log(error);
      // Prisma error P2025: Record to delete not found
      throw new NotFoundException(`Audit Log with ID "${id}" not found.`);
    }
  }
}
