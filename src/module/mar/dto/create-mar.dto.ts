import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsDateString, IsUUID } from 'class-validator';

export class CreateMarDto {
  @ApiPropertyOptional({ description: 'Standard dose, e.g., "2.5 mg/3mL"', example: '2.5 mg/3mL' })
  @IsOptional()
  @IsString()
  standardDose?: string;

  @ApiPropertyOptional({ description: 'Comments about the MAR entry', example: 'Patient tolerated well' })
  @IsOptional()
  @IsString()
  comments?: string;

  @ApiPropertyOptional({ description: 'Digital or text signature', example: 'Signed by Nurse A' })
  @IsOptional()
  @IsString()
  signature?: string;

  @ApiPropertyOptional({ description: 'Time of administration (string format)', example: '14:30' })
  @IsOptional()
  @IsString()
  time_of_administration?: string;

  @ApiPropertyOptional({ description: 'Status of the medication administration', example: 'Given' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ description: 'Checkbox field for verification', example: true })
  @IsOptional()
  @IsBoolean()
  isCheck?: boolean;

  @ApiPropertyOptional({ description: 'Full E-cylinder value', example: '1200 psi' })
  @IsOptional()
  @IsString()
  full_e_cylinder?: string;

  @ApiPropertyOptional({ description: 'Empty E-cylinder value', example: '300 psi' })
  @IsOptional()
  @IsString()
  empty_e_cylinder?: string;

  @ApiPropertyOptional({ description: 'Scheduled datetime for administration', example: '2025-11-21T10:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  schedule?: string;

  @ApiProperty({ description: 'Medication name (copied from Medication table)', example: 'Albuterol' })
  @IsString()
  medication_name: string;

  @ApiProperty({ description: 'Patient ID for this MAR entry', example: 'f0feb326-a697-49b1-ac17-b3deff5347d9' })
  @IsUUID()
  patientId: string;

  @ApiPropertyOptional({ description: 'User ID who is creating this record (nullable)', example: '2bd9c447-4f49-43a6-9b78-70ed2ee54201' })
  @IsOptional()
  @IsUUID()
  userId?: string;
}
