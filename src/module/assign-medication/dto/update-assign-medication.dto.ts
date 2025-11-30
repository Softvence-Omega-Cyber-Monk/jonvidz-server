import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean, IsEnum } from 'class-validator';
import { MedicationStatus } from '@prisma/client';

export class UpdateAssignMedicationDto {
  @ApiPropertyOptional({ example: '2025-11-30T10:00:00Z', description: 'Timestamp or time string when recorded' })
  @IsOptional()
  @IsString()
  time_of_record?: string;

  @ApiPropertyOptional({ example: 'Patient tolerated medication well', description: 'Any comment about administration' })
  @IsOptional()
  @IsString()
  comments?: string;

  @ApiPropertyOptional({ example: '8A-8P', description: 'Schedule or dosing period' })
  @IsOptional()
  @IsString()
  schedule?: string;

  @ApiPropertyOptional({ example: true, description: 'Whether the medication was checked/given' })
  @IsOptional()
  @IsBoolean()
  isCheck?: boolean;

  @ApiPropertyOptional({ enum: MedicationStatus, example: MedicationStatus.Given, description: 'Status of medication' })
  @IsOptional()
  @IsEnum(MedicationStatus)
  status?: MedicationStatus;
}
