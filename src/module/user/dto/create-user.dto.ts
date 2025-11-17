import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
//import { UserRole } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ example: 'nurse.sarah@clinic.com', description: 'Staff member email address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'SecureP@ss2025', description: 'Staff password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'Sarah', description: 'First name of the staff member' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Conner', description: 'Last name of the staff member (Optional)', required: false })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ example: '1234567890', description: 'Unique professional license number' })
  @IsString()
  @IsNotEmpty()
  licenseNumber?: string;

  @ApiProperty({ example: 'Cardiology', description: 'Medical specialty (e.g., Cardiology, Radiology). Required for DOCTOR role.', required: false })
  @IsString()
  @IsOptional()
  specialty?: string;

  // @ApiProperty({ example: UserRole.DOCTOR, description: 'Role of the staff member', enum: UserRole })
  // @IsEnum(UserRole)
  // @IsNotEmpty()
  // role?: UserRole;
}
