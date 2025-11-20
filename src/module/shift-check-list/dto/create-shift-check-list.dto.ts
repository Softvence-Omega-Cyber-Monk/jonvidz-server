
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsBoolean,
  IsInt,
  IsNotEmpty
} from 'class-validator';
import { Type } from 'class-transformer';

// Checklist Item DTO
export class CreateChecklistItemDto {
  @ApiProperty({ description: 'Item description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({
    enum: ['checkbox', 'text', 'select'],
    default: 'checkbox'
  })
  @IsOptional()
  @IsString()
  itemType?: string;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  displayOrder?: number;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isChecked?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  textResponse?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  selectedOption?: string;
}

// Checklist Category DTO
export class CreateChecklistCategoryDto {
  @ApiProperty({ description: 'Category name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  displayOrder?: number;

  @ApiProperty({ type: [CreateChecklistItemDto], description: 'Items in this category' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateChecklistItemDto)
  items: CreateChecklistItemDto[];
}

// Main Shift Checklist DTO
export class CreateShiftCheckListDto {
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

  @ApiProperty({ description: 'Patient ID',example:"3c5b6d02-46e9-4d00-9605-897bdcbd6937" })
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @ApiPropertyOptional({ description: 'Additional comments' })
  @IsOptional()
  @IsString()
  comments?: string;

  @ApiPropertyOptional({ description: 'Signature' })
  @IsOptional()
  @IsString()
  signature?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateChecklistCategoryDto)
  categories: CreateChecklistCategoryDto[];
}
