import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRole } from '@prisma/client';

export class CreateStaffDto {
  @ApiProperty({ example: '1234567890', description: 'Unique professional license number' })
  @IsString()
  @IsNotEmpty()
  licenseNumber: string;

  @ApiProperty({ example: 'Cardiology', description: 'Medical specialty (e.g., Cardiology, Radiology). Required for DOCTOR role.', required: false })
  @IsString()
  @IsOptional()
  specialty?: string;

  @ApiProperty({ example: UserRole.DOCTOR, description: 'Role of the staff member', enum: UserRole })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
