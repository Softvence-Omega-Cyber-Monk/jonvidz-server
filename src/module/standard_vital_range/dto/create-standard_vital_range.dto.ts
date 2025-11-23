import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VitalSignType } from '@prisma/client';
import {
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsString,
  Min,
  IsNumber,
  IsUUID,
} from 'class-validator';

export class CreateStandardVitalRangeDto {
  @ApiProperty({
    description: 'Type of vital sign',
    enum: VitalSignType,
    example: VitalSignType.HEART_RATE_BPM
  })
  @IsNotEmpty()
  @IsEnum(VitalSignType)
  vitalSignType: VitalSignType;

  @ApiProperty({ description: 'Maximum acceptable value (e.g., 100 bpm)', required: false, type: Number })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxValue?: number;

  @ApiProperty({ description: 'Minimum acceptable value (e.g., 60 bpm)', required: false, type: Number })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minValue?: number;

  @ApiProperty({ description: 'Minimum acceptable percentage (for SpO2/Oxygen Saturation), e.g., 95%', required: false, type: Number })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minAcceptablePercentage?: number;

  @ApiProperty({ description: 'Descriptive text for the normal range, e.g., "60 - 100 bpm"', required: false })
  @IsOptional()
  @IsString()
  normalRangeText?: string;

  @ApiPropertyOptional({ description: 'Patient UUID' })
  @IsUUID()
  @IsOptional()
  patientId?: string;
}