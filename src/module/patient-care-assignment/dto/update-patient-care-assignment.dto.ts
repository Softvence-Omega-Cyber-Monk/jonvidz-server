import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
export class UpdatePatientCareAssignmentDto {
  @ApiPropertyOptional({ description: 'Patient ID to assign' })
  @IsOptional()
  patientId?: string;

  @ApiPropertyOptional({ description: 'Staff ID assigned to patient' })
  @IsOptional()
  staffId?: string;

  @ApiPropertyOptional({ description: 'Duration of the shift, e.g., 08:00-16:00' })
  @IsOptional()
  shiftDuration?: string;

  @ApiPropertyOptional({ description: 'Assignment status', })
  @IsOptional()
  status?: "ACTIVE" | "LEAVE" | "RELEASE"

  @ApiPropertyOptional({ description: 'Any notes for this assignment' })
  @IsOptional()
  notes?: string;
}
