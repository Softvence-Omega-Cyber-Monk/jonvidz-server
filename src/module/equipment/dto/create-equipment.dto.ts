import { ApiProperty } from '@nestjs/swagger';
import { EquipmentFrequency } from '@prisma/client';
import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';

export class CreateEquipmentDto {
  @ApiProperty({ description: 'Unique name of the equipment', example: 'Ventilator' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Standard maintenance or replacement frequency',
    enum: EquipmentFrequency,
    example: EquipmentFrequency.QMONTH
  })
  @IsNotEmpty()
  @IsEnum(EquipmentFrequency)
  standard_frequency: EquipmentFrequency;

  @ApiProperty({ description: 'Notes or purpose for this equipment', required: false })
  @IsOptional()
  @IsString()
  notes_or_purpose?: string;
}