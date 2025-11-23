import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsArray, ValidateNested, IsOptional, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateAssignEquipmentItemDto {
  @ApiPropertyOptional({ description: 'AssignEquipment record ID' })
  @IsUUID()
  id: string;

  @ApiPropertyOptional({ description: 'Assigned date/time' })
  @IsOptional()
  date?: string;

  @ApiPropertyOptional({ description: 'Status of the assigned equipment' })
  @IsOptional()
  @IsString()
  status?: string;
}

export class UpdateListEquipmentDto {
  @ApiPropertyOptional({ description: 'Comments for this list of equipment' })
  @IsOptional()
  @IsString()
  comments?: string;

  @ApiPropertyOptional({ description: 'Signature' })
  @IsOptional()
  @IsString()
  signature?: string;

  @ApiPropertyOptional({ description: 'Time of record' })
  @IsOptional()
  @IsString()
  time_of_record?: string;

  @ApiPropertyOptional({ description: 'Full E Cylinder value' })
  @IsOptional()
  @IsString()
  full_e_cylinder?: string;

  @ApiPropertyOptional({ description: 'Empty E Cylinder value' })
  @IsOptional()
  @IsString()
  empty_e_cylinder?: string;

  @ApiPropertyOptional({ type: [UpdateAssignEquipmentItemDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateAssignEquipmentItemDto)
  assignEquipment?: UpdateAssignEquipmentItemDto[];
}
