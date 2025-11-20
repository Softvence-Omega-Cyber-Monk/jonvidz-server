import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateChecklistItemDto {
  @ApiPropertyOptional({ description: 'Item ID' })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiPropertyOptional({ description: 'Item description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Item type' })
  @IsOptional()
  @IsString()
  itemType?: string;

  @ApiPropertyOptional({ description: 'Display order' })
  @IsOptional()
  @IsNumber()
  displayOrder?: number;

  @ApiPropertyOptional({ description: 'Is item required' })
  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

  @ApiPropertyOptional({ description: 'Is item checked' })
  @IsOptional()
  @IsBoolean()
  isChecked?: boolean;
}

export class UpdateChecklistCategoryDto {
  @ApiPropertyOptional({ description: 'Category ID' })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiPropertyOptional({ description: 'Selection type' })
  @IsOptional()
  @IsString()
  selectType?: string;

  @ApiPropertyOptional({ description: 'Category name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Display order' })
  @IsOptional()
  @IsNumber()
  displayOrder?: number;

  @ApiPropertyOptional({
    type: [UpdateChecklistItemDto],
    description: 'Checklist items'
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateChecklistItemDto)
  items?: UpdateChecklistItemDto[];
}

export class UpdateShiftCheckListDto {
  @ApiPropertyOptional({
    enum: ['Morning', 'Evening', 'Night'],
    description: 'Type of shift'
  })
  @IsOptional()
  @IsString()
  shiftType?: string;

  @ApiPropertyOptional({
    enum: ['Daily', 'Weekly', 'Monthly'],
    description: 'Selection type'
  })
  @IsOptional()
  @IsString()
  selectType?: string;

  @ApiPropertyOptional({ description: 'Full E-cylinders count' })
  @IsOptional()
  @IsString()
  full_e_cylinders?: string;

  @ApiPropertyOptional({ description: 'Empty E-cylinders count' })
  @IsOptional()
  @IsString()
  empty_e_cylinders?: string;

  @ApiPropertyOptional({ description: 'User ID (nullable)' })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiPropertyOptional({ description: 'Patient ID' })
  @IsOptional()
  @IsString()
  patientId?: string;

  @ApiPropertyOptional({ description: 'Additional comments' })
  @IsOptional()
  @IsString()
  comments?: string;

  @ApiPropertyOptional({ description: 'Signature' })
  @IsOptional()
  @IsString()
  signature?: string;

  @ApiPropertyOptional({
    type: [UpdateChecklistCategoryDto],
    description: 'Checklist categories with items'
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateChecklistCategoryDto)
  categories?: UpdateChecklistCategoryDto[];
}