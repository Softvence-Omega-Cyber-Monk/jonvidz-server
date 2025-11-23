// import { PartialType } from '@nestjs/swagger';
// import { CreateAssignEquipmentDto } from './create-assign-equipment.dto';
//
// export class UpdateAssignEquipmentDto extends PartialType(CreateAssignEquipmentDto) {}



import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsDateString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { EquipmentFrequency } from '@prisma/client'; // Assuming you have an enum for frequency

export class UpdateNestedEquipmentDto {
  @ApiPropertyOptional({ description: 'Equipment name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Standard frequency of equipment', enum: EquipmentFrequency })
  @IsOptional()
  @IsEnum(EquipmentFrequency)
  standard_frequency?: EquipmentFrequency;

  @ApiPropertyOptional({ description: 'Notes or purpose for the equipment' })
  @IsOptional()
  @IsString()
  notes_or_purpose?: string;
}

export class UpdateAssignEquipmentDto {
  @ApiPropertyOptional({ description: 'Date of assignment in ISO format' })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiPropertyOptional({ description: 'Status of the assignment' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ type: UpdateNestedEquipmentDto, description: 'Nested equipment update' })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateNestedEquipmentDto)
  equipment?: UpdateNestedEquipmentDto;
}
