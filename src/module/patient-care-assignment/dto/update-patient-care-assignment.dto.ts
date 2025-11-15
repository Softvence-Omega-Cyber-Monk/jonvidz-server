import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePatientCareAssignmentDto {
  @ApiPropertyOptional({ description: 'Patient ID to assign' })
  patientId?: string;

  @ApiPropertyOptional({ description: 'Staff ID assigned to patient' })
  staffId?: string;

  @ApiPropertyOptional({ description: 'Duration of the shift, e.g., 08:00-16:00' })
  shiftDuration?: string;

  @ApiPropertyOptional({ description: 'Any notes for this assignment' })
  notes?: string;
}
