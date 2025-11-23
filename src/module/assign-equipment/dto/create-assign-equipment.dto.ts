//export class CreateAssignEquipmentDto {}
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateAssignEquipmentDto {
  @ApiPropertyOptional({ description: 'Date assigned (ISO8601). If omitted, server will set now.', example: '2025-11-23T10:30:00.000Z' })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiProperty({ description: 'Assignment status', example: 'ASSIGNED' })
  @IsString()
  status: string;

  @ApiProperty({ description: 'Equipment id (foreign key)', example: '2bd9c447-4f49-43a6-9b78-70ed2ee54201' })
  @IsUUID()
  equipmentId: string;

  @ApiProperty({ description: 'ListOfEquipment id (foreign key)', example: 'f592fbeb-8bc4-4a1f-aa5f-56c1910f540c' })
  @IsUUID()
  listOfEquipmentId: string;
}

