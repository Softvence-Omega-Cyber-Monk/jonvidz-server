import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { LoginDto, RegisterPatientDto, RegisterStaffDto } from './dto/create-auth.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Patient, Staff, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    role: UserRole;
  };
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async registerStaff(dto: RegisterStaffDto): Promise<Staff> {
    const existingUser = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists.');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const role: UserRole = dto.role;

    const staff = await this.prisma.$transaction(async (tx:Prisma.TransactionClient) => {

      const user = await tx.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          firstName: dto.firstName,
          lastName: dto.lastName,
          role: role,
        },
      });

      return tx.staff.create({
        data: {
          userId: user.id,
          licenseNumber: dto.licenseNumber,
          specialty: dto.specialty,
        },
      });
    });

    return staff;
  }

  async registerPatient(dto: RegisterPatientDto): Promise<Patient> {
    const existingUser = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists.');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const patient = await this.prisma.$transaction(async (tx:Prisma.TransactionClient) => {

      // let finalMrn: string;

      // if (dto.medicalRecordNo) {
      //   finalMrn = dto.medicalRecordNo;
      // } else {
      //   finalMrn = await this.generateSequentialMrnInTx(tx);
      // }
     const finalMrn = await this.generateSequentialMrnInTx(tx)
      const user = await tx.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          firstName: dto.firstName,
          lastName: dto.lastName,
          role: UserRole.PATIENT,
        },
      });

      return tx.patient.create({
        data: {
          userId: user.id,
          medicalRecordNo: finalMrn,
          dob: new Date(dto.dob),
          gender: dto.gender,
          allergies: dto.allergies,
        },
      });
    });

    return patient;
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });
    await this.prisma.auditLog.create({
      data: {
        userId:user.id,
        eventType:"LOGIN",
        details:"User logged in"
      },
    })
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken: accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
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

}