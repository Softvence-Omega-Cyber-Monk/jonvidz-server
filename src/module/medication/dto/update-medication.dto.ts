import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateMedicationDto } from './create-medication.dto';

// Use PartialType to make all fields optional for updates
export class UpdateMedicationDto extends PartialType(CreateMedicationDto) {
  @ApiPropertyOptional({ description: 'Unique name of the medication' })
  @IsOptional()
  @IsString()
  name?: string;

}

