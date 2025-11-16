import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { safeUserSelect } from './dto/safeUserSelect';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists.');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const staff = await this.prisma.$transaction(async (tx:Prisma.TransactionClient) => {
      const user = await tx.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          firstName: dto.firstName,
          lastName: dto.lastName,
          role: "USER",
          status: "INACTIVE",
        },
      });

      return tx.staff.create({
        data: {
          userId: user?.id,
          staffID: null,
          licenseNumber: "",
          specialty: "",
        },
      });
    });

    return staff;
  }
  async findAll() {
    const users = await this.prisma.user.findMany({select: {
        ...safeUserSelect,
        staff: true,
        patient: true,
      },});
    return users;
  }

  async update(id: string, dto: UpdateUserDto) {
    // check if user exists
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    const data: any = { ...dto };



    const updated = await this.prisma.user.update({
      where: { id },
      data,
      include: { staff: true },
    });

    const { password, ...result } = updated;
    return result;
  }


}
