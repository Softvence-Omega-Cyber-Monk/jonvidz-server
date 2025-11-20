import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateMarDto {
  @ApiProperty({ example: '2.5 mg/3mL', required: false })
  @IsOptional()
  standardDose?: string;

  @ApiProperty({ example: 'Albuterol', description: 'Medication ID' })
  @IsString()
  @IsNotEmpty()
  medicationId: string; // <-- required

  @ApiProperty({ example: 'Patient tolerated well', required: false })
  @IsOptional()
  comments?: string;

  @ApiProperty({ example: 'Signed by Nurse A', required: false })
  @IsOptional()
  signature?: string;

  @ApiProperty({ example: '14:30', required: false })
  @IsOptional()
  time_of_administration?: string;

  @ApiProperty({ example: 'Given', required: false })
  @IsOptional()
  status?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  isCheck?: boolean;

  @ApiProperty({ example: '1200 psi', required: false })
  @IsOptional()
  full_e_cylinder?: string;

  @ApiProperty({ example: '300 psi', required: false })
  @IsOptional()
  empty_e_cylinder?: string;

  @ApiProperty({ example: '2025-11-21T10:00:00.000Z', required: false })
  @IsOptional()
  schedule?: Date;

  @ApiProperty({ example: 'f0feb326-a697-49b1-ac17-b3deff5347d9' })
  patientId: string;

  @ApiProperty({ example: '2bd9c447-4f49-43a6-9b78-70ed2ee54201', required: false })
  @IsOptional()
  userId?: string;
}
