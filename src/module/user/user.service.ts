import { Injectable,NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { safeUserSelect } from './dto/safeUserSelect';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}


  async findAll() {
    const users = await this.prisma.user.findMany({select: {
        ...safeUserSelect,
        staff: true,
        patient: true,
      },});
    return users;
    // const users = await this.prisma.user.findMany({include: {
    //     staff: true,
    //     patient: true,
    //   },});
    // return users;
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
