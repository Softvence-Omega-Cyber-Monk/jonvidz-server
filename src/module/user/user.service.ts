import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { safeUserSelect } from './dto/safeUserSelect';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Prisma, UserRole } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/guards/roles.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists.');
    }
 // if(dto?.licenseNumber){
 //   const existingStaffByLicense = await this.prisma.staff.findUnique({ where: { licenseNumber: dto.licenseNumber } });
 //   if (existingStaffByLicense) {
 //     throw new ConflictException('User with this licenseNumber already exists.');
 //   }
 // }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    //const role: UserRole = dto.role;

    const staff = await this.prisma.$transaction(async (tx:Prisma.TransactionClient) => {
      const staffID = await this.generateSequentialStaffIdInTx(tx);
      const user = await tx.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          firstName: dto.fullName,
          phone: dto.phone,
          role: 'USER',
        },
      });

      return tx.staff.create({
        data: {
          userId: user.id,
          staffID: staffID,
          //licenseNumber: dto.licenseNumber,
          //specialty: dto.specialty,
        },
      });
    });

    return staff;
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR,UserRole.ADMIN,UserRole.NURSE,UserRole.RECEPTIONIST,UserRole.MODERATOR)
  async findAll() {
    const users = await this.prisma.user.findMany({select: {
        ...safeUserSelect,
        staff: true,
        patient: true,
      },});
    return users;
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOne(id: string) {
    const isUser=await this.prisma.staff.findUnique({ where: { id: id } });
    if (!isUser) {
      throw new NotFoundException('User with this ID Not exists.');
    }
    return this.prisma.staff.findUnique({
      where: { id },
      include: {
        user: { select: safeUserSelect },
      },
    });
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(id: string, dto: UpdateUserDto) {
    // check if user exists
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    // Build update data object properly
    const updateData = {
      ...(dto.email && { email: dto.email }),
      ...(dto.phone && { phone: dto.phone }),
      ...(dto.fullName && { firstName: dto.fullName }),
    };

    if (Object.keys(updateData).length === 0) {
      throw new BadRequestException('No valid fields provided for update');
    }

    return this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const isExists = await this.prisma.user.findUnique({
      where: { id }
    });
    if (!isExists) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.prisma.user.delete({where: { id }});
  }
  async activeStaffAndTotalUser() {
    const data = await this.prisma.staff.findMany({
      where: {
        user: {
          status: 'ACTIVE'
        }
      },
      include: {
        user: { select: safeUserSelect },
      },
    });
    const totalPatients = await this.prisma.patient.findMany();
    return {'active-staffs':data.length, 'total-patients':totalPatients.length};
  }
  private async generateSequentialMrnInTx(tx: Prisma.TransactionClient): Promise<string> {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const dateKey = `${year}${month}${day}`;
    const sequenceRecord = await tx.dailySequence.upsert({
      where: { date: dateKey },
      update: { currentCount: { increment: 1 } },
      create: { date: dateKey, currentCount: 1 },
    });

    const sequenceNumber = sequenceRecord.currentCount;
    const paddedSequence = String(sequenceNumber).padStart(5, '0');
    console.log(`${paddedSequence} - ${sequenceNumber}`);
    return `${dateKey}-${paddedSequence}`;
  }
  private async generateSequentialStaffIdInTx(
    tx: Prisma.TransactionClient,
    opts?: { key?: string; prefix?: string; padLength?: number; }
  ): Promise<string> {
    const key = opts?.key ?? 'staff';
    const prefix = opts?.prefix ?? 'USR-';
    const padLength = opts?.padLength ?? 3;

    // Atomically create or increment the sequence row for 'staff'
    const seq = await tx.staffSequence.upsert({
      where: { key },
      create: { key, currentCount: 1 },
      update: { currentCount: { increment: 1 } },
    });

    const newNumber = seq.currentCount;
    const padded = String(newNumber).padStart(padLength, '0');
    return `${prefix}${padded}`;
  }
}
