import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { safeUserSelect } from '../user/dto/safeUserSelect';
import { UpdateStaffDto } from '../staff/dto/update-staff.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PatientService {
  constructor(private readonly prisma: PrismaService) {}
  // create(createPatientDto: CreatePatientDto) {
  //   return 'This action adds a new patient';
  // }

  async findAll() {
    // const data = await this.prisma.patient.findMany({include: {
    //     user: { select: safeUserSelect },
    //   },});
    const data = await this.prisma.patient.findMany({
      where: {
        user: {
          status: 'ACTIVE',
        },
      },
      include: {
        user: { select: safeUserSelect },
      },
    });
    return data;
  }

  async findOne(id: string) {
    const data = await this.prisma.patient.findUnique({where: { id },include: {
        patientCareAssignments: true, // <- returns full objects (all columns on that model)
        flow_sheet: {
          orderBy: { createdAt: 'desc' }, // newest first
          include: {
            off_vent_monitoring: true,
            measured_data: true,
            alarms_parameters: true,
            vent_setting: true,
            vital_parameters: true,
          },
        },
      },
    });
    return data;
  }
  async totalPatient() {
    const data = await this.prisma.patient.findMany();
    return data;
  }
  // async update(id: string,dto: UpdatePatientDto) {
  //   try {
  //     const updateData = {
  //       ...dto,
  //       ...(dto.dob && { dob: new Date(dto.dob) })
  //     };
  //     return await this.prisma.patient.update({
  //       where: { id },
  //       data: updateData,
  //     });
  //   } catch (error) {
  //     // Handle the case where the ID does not exist
  //     if (error.code === 'P2025') {
  //       throw new NotFoundException(`Patient with ID "${id}" not found.`);
  //     }
  //     throw error;
  //   }
  // }
  async update(id: string, dto: UpdatePatientDto) {
    try {
      // 1) collect staff-level fields
      const patientFields: Record<string, any> = {};
      if (dto.allergies !== undefined) patientFields.allergies = dto.allergies;
      if (dto.dob !== undefined) patientFields.dob = dto.dob;
      if (dto.gender !== undefined) patientFields.gender = dto.gender;
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
        const patientWithUser = await this.prisma.patient.findUnique({
          where: { id },
          select: { user: { select: { id: true, password: true } } },
        });

        if (!patientWithUser || !patientWithUser.user) {
          throw new NotFoundException(`Patient with ID "${id}" not found or has no user.`);
        }

        const currentHash = patientWithUser.user.password;
        const isMatch = await bcrypt.compare(dto.currentPassword, currentHash);
        if (!isMatch) {
          throw new BadRequestException('Current password is incorrect.');
        }

        const saltRounds = 10;
        const hashed = await bcrypt.hash(dto.newPassword, saltRounds);
        userUpdate.password = hashed;
      }

      // 4) build final update payload
      const updateData: any = { ...patientFields };

      if (Object.keys(userUpdate).length > 0) {
        updateData.user = { update: userUpdate };
      }

      // if nothing to update, throw
      if (Object.keys(updateData).length === 0) {
        throw new BadRequestException('No updatable fields provided.');
      }

      // 5) perform update
      const updated = await this.prisma.patient.update({
        where: { id },
        data: updateData,
        include: {
          user: { select: safeUserSelect },
        },
      });

      return {
        statusCode: 200,
        success: true,
        message: 'Patient updated successfully.',
        data: updated,
      };
    } catch (error: any) {
      // prisma: record not found when updating
      if (error?.code === 'P2025') {
        throw new NotFoundException(`Patient with ID "${id}" not found.`);
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
      return await this.prisma.patient.delete({
        where: { id },
      });
    } catch (error) {
      // Handle the case where the ID does not exist
      if (error.code === 'P2025') {
        throw new NotFoundException(`Patient with ID "${id}" not found.`);
      }
      throw error;
    }
  }
}
