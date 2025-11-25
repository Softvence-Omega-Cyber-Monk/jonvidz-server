// import { PartialType } from '@nestjs/swagger';
// import { CreatePatientDto } from './create-patient.dto';
//
// export class UpdatePatientDto extends PartialType(CreatePatientDto) {}
import { IsOptional, IsString, ValidateNested, IsEmail, MinLength, IsDateString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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

export class UpdatePatientDto {
  @ApiPropertyOptional({ description: 'allergies', example: 'allergies' })
  @IsOptional()
  @IsString()
  allergies?: string;

  @ApiProperty({ example: '1995-10-25', description: 'Date of Birth (ISO 8601 format)', format: 'date' })
  @IsDateString()
  @IsNotEmpty()
  dob: string;

  @ApiProperty({ example: 'Female', description: 'Gender', required: false })
  @IsString()
  @IsOptional()
  gender?: string;

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
