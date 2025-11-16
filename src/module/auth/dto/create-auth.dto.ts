import { UserRole } from '@prisma/client';
export class CreateAuthDto {}
import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'doctor.john@clinic.com', description: 'User email address for login' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'StrongP@ss123', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class RegisterStaffDto {
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

export class RegisterPatientDto {
  @ApiProperty({ example: 'patient.lima@example.com', description: 'Patient email address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'PatP@ss2025', description: 'Patient password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'Lima', description: 'Patient first name' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Smith', description: 'Patient last name (Optional)', required: false })
  @IsString()
  @IsOptional()
  lastName?: string;

  // Patient Specific Fields
  @ApiProperty({ example: '1995-10-25', description: 'Date of Birth (ISO 8601 format)', format: 'date' })
  @IsDateString()
  @IsNotEmpty()
  dob: string;

  // @ApiProperty({ example: 'MRN-90210', description: 'Optional Medical Record Number (if entered by staff)', required: false })
  // @IsString()
  // @IsOptional()
  // medicalRecordNo?: string;

  @ApiProperty({ example: 'Female', description: 'Gender', required: false })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty({ example: '107A', required: false })
  @IsString()
  @IsOptional()
  room?: string;

  @ApiProperty({ example: 'Penicillin, Dust', description: 'Known patient allergies', required: false })
  @IsString()
  @IsOptional()
  allergies?: string;
}