import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class CreatePatientCareAssignmentDto {
  @ApiProperty({ description: 'Patient ID to assign' })
  @IsUUID()
  patientId: string;

  @ApiProperty({ description: 'Staff ID assigned to patient' })
  @IsUUID()
  staffId: string;

  @ApiPropertyOptional({ description: 'Duration of the shift, e.g., 08:00-16:00' })
  shiftDuration?: string;

  @ApiPropertyOptional({ description: 'Any notes for this assignment', type: String })
  @IsOptional()
  notes?: string;
}


