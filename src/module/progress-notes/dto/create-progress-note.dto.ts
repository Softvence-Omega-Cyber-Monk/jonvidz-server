import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProgressNoteDto {
  @ApiPropertyOptional({ type: String })
  noteType?: string;

  @ApiPropertyOptional({ type: Boolean })
  checked?: boolean;

  @ApiPropertyOptional({ type: String })
  comments?: string;

  @ApiPropertyOptional({ type: String })
  signature?: string;

  //@ApiPropertyOptional({ type: String })
  patientCareAssignmentId?: string;

  //@ApiPropertyOptional({ type: String, nullable: true })
  userId?: string | null;

  //@ApiPropertyOptional({ type: String })
  patientId?: string;
}
