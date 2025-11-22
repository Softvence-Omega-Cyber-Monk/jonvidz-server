import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class UpdateMarDto {
  @ApiPropertyOptional({ example: 'Patient tolerated well' })
  @IsOptional()
  @IsString()
  comments?: string;

  @ApiPropertyOptional({ example: 'Signed by Nurse A' })
  @IsOptional()
  @IsString()
  signature?: string;

  @ApiPropertyOptional({ example: '14:30' })
  @IsOptional()
  @IsString()
  time_of_administration?: string;

  @ApiPropertyOptional({ example: 'Given' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isCheck?: boolean;

  @ApiPropertyOptional({ example: '1200 psi' })
  @IsOptional()
  @IsString()
  full_e_cylinder?: string;

  @ApiPropertyOptional({ example: '300 psi' })
  @IsOptional()
  @IsString()
  empty_e_cylinder?: string;

  @ApiPropertyOptional({ example: '2025-11-21T10:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  schedule?: Date;

  //@ApiPropertyOptional({ example: 'fe6182f7-3c80-4fc0-96b4-c1f2f41a5a22' })
  @IsOptional()
  @IsString()
  patientCareAssignmentId?: string;

  //@ApiPropertyOptional({ example: 'ca382e0d-8d80-4e8c-8fac-1d46974f0abd' })
  @IsOptional()
  @IsString()
  medicationId?: string;

  //@ApiPropertyOptional({ example: '2bd9c447-4f49-43a6-9b78-70ed2ee54201' })
  @IsOptional()
  @IsString()
  userId?: string;

  //@ApiPropertyOptional({ example: '7c0beaa8-3714-49d0-9e47-479050d55aea' })
  @IsOptional()
  @IsString()
  patientId?: string;
}
