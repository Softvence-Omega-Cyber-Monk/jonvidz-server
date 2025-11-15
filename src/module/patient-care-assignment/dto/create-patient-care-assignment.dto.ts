import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional } from 'class-validator';

export class CreatePatientCareAssignmentDto {
  @ApiProperty({ description: 'Patient ID' })
  @IsUUID()
  patientId: string;

  @ApiProperty({ description: 'Staff ID' })
  @IsUUID()
  staffId: string;

  @ApiPropertyOptional({ description: 'Optional notes' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ description: 'Assignment status', })
  @IsOptional()
  status?: "ACTIVE" | "LEAVE" | "RELEASE"

  @ApiPropertyOptional({ description: 'Shift duration, e.g., 08:00-16:00' })
  @IsOptional()
  @IsString()
  shiftDuration?: string;
}
