import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  ValidateNested,
  IsNumber,
  IsBoolean,
  IsEnum,
  IsNotEmpty
} from 'class-validator';
import { Type } from 'class-transformer';

// Enums
export enum CheckedPreSuctionVitals {
  ORAL = 'ORAL',
  NASAL = 'NASAL',
  TRACHEAL = 'TRACHEAL'
}

export enum ColorSecretionsDescription {
  CLEAR = 'CLEAR',
  WHITE = 'WHITE',
  YELLOW = 'YELLOW',
  BLOODY = 'BLOODY'
}

export enum ConsistencySecretionsDescription {
  THIN = 'THIN',
  THICK = 'THICK',
  TENACIOUS = 'TENACIOUS'
}

export enum AmountSecretionsDescription {
  SMALL = 'SMALL',
  MODERATE = 'MODERATE',
  LARGE = 'LARGE'
}

// Create DTOs
export class CreateSuctionLogDto {
  @ApiProperty({
    required: true,
    description: 'Patient id',
    example: '434b1b60-46a0-4a4b-8ba1-207c503f5a0d'
  })
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @ApiPropertyOptional({
    description: 'User ID',
    example: 'user-uuid-here'
  })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiPropertyOptional({
    description: 'Signature',
    example: 'ELON'
  })
  @IsOptional()
  @IsString()
  signature?: string;

  @ApiPropertyOptional({
    description: 'Notes/comments',
    example: 'Patient had moderate secretions'
  })
  @IsOptional()
  @IsString()
  comments?: string;
}

// Update Child DTOs (as single objects)
export class UpdatePreSuctionVitalsDto {
  @ApiPropertyOptional({ description: 'Pre-suction vital ID' })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiPropertyOptional({ description: 'SPO2 percentage' })
  @IsOptional()
  @IsNumber()
  spO2Percent?: number;

  @ApiPropertyOptional({ description: 'Heart rate (bpm)' })
  @IsOptional()
  @IsNumber()
  hr_bpm?: number;

  @ApiPropertyOptional({ description: 'Pulse rate (bpm)' })
  @IsOptional()
  @IsNumber()
  pr_bpm?: number;

  @ApiPropertyOptional({
    enum: CheckedPreSuctionVitals,
    description: 'Checked suction vital type'
  })
  @IsOptional()
  @IsEnum(CheckedPreSuctionVitals)
  checkedSuctionVital?: CheckedPreSuctionVitals;

  @ApiPropertyOptional({ description: 'Checked status' })
  @IsOptional()
  @IsBoolean()
  checked?: boolean;
}

export class UpdateSecretionsDescriptionDto {
  @ApiPropertyOptional({ description: 'Secretions description ID' })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiPropertyOptional({
    enum: ColorSecretionsDescription,
    description: 'Color of secretions'
  })
  @IsOptional()
  @IsEnum(ColorSecretionsDescription)
  color?: ColorSecretionsDescription;

  @ApiPropertyOptional({
    enum: ConsistencySecretionsDescription,
    description: 'Consistency of secretions'
  })
  @IsOptional()
  @IsEnum(ConsistencySecretionsDescription)
  consistency?: ConsistencySecretionsDescription;

  @ApiPropertyOptional({
    enum: AmountSecretionsDescription,
    description: 'Amount of secretions'
  })
  @IsOptional()
  @IsEnum(AmountSecretionsDescription)
  amount?: AmountSecretionsDescription;
}

export class UpdatePostSuctionVitalsDto {
  @ApiPropertyOptional({ description: 'Post-suction vital ID' })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiPropertyOptional({ description: 'SPO2 level' })
  @IsOptional()
  @IsNumber()
  sp_o2?: number;

  @ApiPropertyOptional({ description: 'Heart rate (bpm)' })
  @IsOptional()
  @IsNumber()
  hr_bpm?: number;

  @ApiPropertyOptional({ description: 'Pulse rate (bpm)' })
  @IsOptional()
  @IsNumber()
  pr_bpm?: number;

  @ApiPropertyOptional({ description: 'Checked status' })
  @IsOptional()
  @IsBoolean()
  checked?: boolean;
}

// Main Update DTO with single objects
export class UpdateSuctionLogDto extends PartialType(CreateSuctionLogDto) {
  @ApiPropertyOptional({
    description: 'Patient id',
    example: '434b1b60-46a0-4a4b-8ba1-207c503f5a0d'
  })
  @IsOptional()
  @IsString()
  patientId?: string;

  @ApiPropertyOptional({
    description: 'User ID',
    example: 'user-uuid-here'
  })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiPropertyOptional({
    description: 'Signature',
    example: 'ELON'
  })
  @IsOptional()
  @IsString()
  signature?: string;

  @ApiPropertyOptional({
    description: 'Notes/comments',
    example: 'Patient had moderate secretions'
  })
  @IsOptional()
  @IsString()
  comments?: string;

  @ApiPropertyOptional({
    type: UpdatePreSuctionVitalsDto,
    description: 'Pre-suction vitals'
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdatePreSuctionVitalsDto)
  pre_suction_vitals?: UpdatePreSuctionVitalsDto;

  @ApiPropertyOptional({
    type: UpdateSecretionsDescriptionDto,
    description: 'Secretions description'
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateSecretionsDescriptionDto)
  secretions_description?: UpdateSecretionsDescriptionDto;

  @ApiPropertyOptional({
    type: UpdatePostSuctionVitalsDto,
    description: 'Post-suction vitals'
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdatePostSuctionVitalsDto)
  post_suction_vitals?: UpdatePostSuctionVitalsDto;
}

// Create DTO with single objects
export class CreateSuctionLogWithChildrenDto {
  @ApiProperty({
    required: true,
    description: 'Patient id',
    example: '434b1b60-46a0-4a4b-8ba1-207c503f5a0d'
  })
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @ApiPropertyOptional({
    description: 'User ID',
    example: 'user-uuid-here'
  })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiPropertyOptional({
    description: 'Signature',
    example: 'ELON'
  })
  @IsOptional()
  @IsString()
  signature?: string;

  @ApiPropertyOptional({
    description: 'Notes/comments',
    example: 'Patient had moderate secretions'
  })
  @IsOptional()
  @IsString()
  comments?: string;

  @ApiPropertyOptional({
    type: UpdatePreSuctionVitalsDto,
    description: 'Pre-suction vitals'
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdatePreSuctionVitalsDto)
  pre_suction_vitals?: UpdatePreSuctionVitalsDto;

  @ApiPropertyOptional({
    type: UpdateSecretionsDescriptionDto,
    description: 'Secretions description'
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateSecretionsDescriptionDto)
  secretions_description?: UpdateSecretionsDescriptionDto;

  @ApiPropertyOptional({
    type: UpdatePostSuctionVitalsDto,
    description: 'Post-suction vitals'
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdatePostSuctionVitalsDto)
  post_suction_vitals?: UpdatePostSuctionVitalsDto;
}