import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { AuditEventType } from '@prisma/client';

export class CreateAuditLogDto {

  @ApiProperty({
    description: 'The ID of the user who triggered this event.',
    example: 'admin01',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'The type or category of the audit event.',
    enum: AuditEventType,
    example: AuditEventType.USER_MANAGEMENT,
  })
  @IsEnum(AuditEventType)
  eventType: AuditEventType;

  @ApiProperty({
    description: 'Optional ID of the patient involved in the event.',
    example: 'PAT-004',
    required: false,
  })
  @IsOptional()
  @IsString()
  patientId?: string;

  @ApiProperty({
    description: 'A detailed descriptive message of the event.',
    example: 'Updated diagnosis to Type 2 Diabetes',
  })
  @IsString()
  @IsNotEmpty()
  details: string;
}