import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateSuctionLogDto {
  @ApiProperty({
    required: true,
    description: 'Patient id',
    example: '434b1b60-46a0-4a4b-8ba1-207c503f5a0d'
  })
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @ApiPropertyOptional({
    description: 'User ID',
    example: 'user-uuid-here'
  })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiPropertyOptional({
    description: 'Signature',
    example: 'ELON'
  })
  @IsOptional()
  @IsString()
  signature?: string;

  @ApiPropertyOptional({
    description: 'Notes/comments',
    example: 'Patient had moderate secretions'
  })
  @IsOptional()
  @IsString()
  comments?: string;
}