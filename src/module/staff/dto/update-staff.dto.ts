import { IsOptional, IsString, ValidateNested, IsEmail, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserPartialDto {
  //@ApiPropertyOptional({ description: 'User email', example: 'user@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: 'First name', example: 'John' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ description: 'Last name', example: 'Doe' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ description: 'Phone number', example: '+8801XXXXXXXXX' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ description: 'address', example: 'dhaka,Bangladesh' })
  @IsOptional()
  @IsString()
  emergencyName?: string;

  @ApiPropertyOptional({ description: 'Contact number', example: '+8801XXXXXXXXX' })
  @IsOptional()
  @IsString()
  emergencyNumber?: string;

  //@ApiPropertyOptional({ description: 'Profile image URL', example: 'https://...' })
  @IsOptional()
  @IsString()
  profileImage?: string;

  @ApiPropertyOptional({ description: 'Signature', example: 'Jone Due' })
  @IsOptional()
  @IsString()
  signature?: string;

  // Password is handled via currentPassword/newPassword in parent DTO
}

export class UpdateStaffDto {
  //@ApiPropertyOptional({ description: 'Staff identifier (internal)', example: 'USR-001' })
  @IsOptional()
  @IsString()
  staffID?: string;

  @ApiPropertyOptional({ description: 'Specialty area', example: 'Cardiology' })
  @IsOptional()
  @IsString()
  specialty?: string;

  //@ApiPropertyOptional({ description: 'License number', example: '9234567890' })
  @IsOptional()
  @IsString()
  licenseNumber?: string;

  @ApiPropertyOptional({
    description: 'Partial user object to update nested user fields',
    type: () => UpdateUserPartialDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateUserPartialDto)
  user?: UpdateUserPartialDto;

  @ApiPropertyOptional({ description: 'Current password — required when changing password', minLength: 6 })
  @IsOptional()
  @IsString()
  @MinLength(6)
  currentPassword?: string;

  @ApiPropertyOptional({ description: 'New password — required when changing password', minLength: 6 })
  @IsOptional()
  @IsString()
  @MinLength(6)
  newPassword?: string;
}
