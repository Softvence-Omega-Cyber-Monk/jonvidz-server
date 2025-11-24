import { Injectable, NotFoundException,ConflictException ,BadRequestException} from '@nestjs/common';
//import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { safeUserSelect } from '../user/dto/safeUserSelect';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StaffService {
  constructor(private readonly prisma: PrismaService) {}
  // create(createStaffDto: CreateStaffDto) {
  //   return 'This action adds a new staff';
  // }

  async findAll() {
    const data = await this.prisma.staff.findMany({
      include: {
        user: { select: safeUserSelect },
      },
    });
    return data;
  }
  async activeStaff() {
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
    console.log("-------->",data.length)
    return data;
  }

  async findOne(id: string) {
    const data = await this.prisma.staff.findUnique({where: { id },include: {
        user: { select: safeUserSelect },
      },});
    return data;
  }

  async update(id: string, dto: UpdateStaffDto) {
    try {
      // 1) collect staff-level fields
      const staffFields: Record<string, any> = {};
      if (dto.staffID !== undefined) staffFields.staffID = dto.staffID;
      if (dto.specialty !== undefined) staffFields.specialty = dto.specialty;
      if (dto.licenseNumber !== undefined) staffFields.licenseNumber = dto.licenseNumber;
      // add other staff-level fields similarly...

      // 2) prepare user-level updates
      const userUpdate: Record<string, any> = {};
      if (dto.user) {
        if (dto.user.email !== undefined) userUpdate.email = dto.user.email;
        if (dto.user.firstName !== undefined) userUpdate.firstName = dto.user.firstName;
        if (dto.user.lastName !== undefined) userUpdate.lastName = dto.user.lastName;
        if (dto.user.phone !== undefined) userUpdate.phone = dto.user.phone;
        if (dto.user.profileImage !== undefined) userUpdate.profileImage = dto.user.profileImage;
        // add other safe user fields similarly...
      }

      // 3) handle password change (if requested)
      if (dto.currentPassword || dto.newPassword) {
        if (!dto.currentPassword || !dto.newPassword) {
          throw new BadRequestException('Both currentPassword and newPassword are required to change password.');
        }

        // fetch existing password hash
        const staffWithUser = await this.prisma.staff.findUnique({
          where: { id },
          select: { user: { select: { id: true, password: true } } },
        });

        if (!staffWithUser || !staffWithUser.user) {
          throw new NotFoundException(`Staff with ID "${id}" not found or has no user.`);
        }

        const currentHash = staffWithUser.user.password;
        const isMatch = await bcrypt.compare(dto.currentPassword, currentHash);
        if (!isMatch) {
          throw new BadRequestException('Current password is incorrect.');
        }

        const saltRounds = 10;
        const hashed = await bcrypt.hash(dto.newPassword, saltRounds);
        userUpdate.password = hashed;
      }

      // 4) build final update payload
      const updateData: any = { ...staffFields };

      if (Object.keys(userUpdate).length > 0) {
        updateData.user = { update: userUpdate };
      }

      // if nothing to update, throw
      if (Object.keys(updateData).length === 0) {
        throw new BadRequestException('No updatable fields provided.');
      }

      // 5) perform update
      const updated = await this.prisma.staff.update({
        where: { id },
        data: updateData,
        include: {
          user: { select: safeUserSelect },
        },
      });

      return {
        statusCode: 200,
        success: true,
        message: 'Staff updated successfully.',
        data: updated,
      };
    } catch (error: any) {
      // prisma: record not found when updating
      if (error?.code === 'P2025') {
        throw new NotFoundException(`Staff with ID "${id}" not found.`);
      }
      // rethrow other known Nest exceptions
      if (error instanceof BadRequestException || error instanceof NotFoundException || error instanceof ConflictException) {
        throw error;
      }
      // unknown error
      throw error;
    }
  }




  async remove(id: string) {
    try {
      return await this.prisma.staff.delete({
        where: { id },
      });
    } catch (error) {
      // Handle the case where the ID does not exist
      if (error.code === 'P2025') {
        throw new NotFoundException(`Staff with ID "${id}" not found.`);
      }
      throw error;
    }
  }
}
