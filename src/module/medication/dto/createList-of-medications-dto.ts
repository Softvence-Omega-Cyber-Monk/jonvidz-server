import { IsOptional, IsString, IsEnum, IsBoolean } from 'class-validator';
import { MedicationStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateListOfMedicationsDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  medicationId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  marId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  time_of_record?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  schedule?: string;

  @ApiProperty({ required: false, enum: MedicationStatus })
  @IsOptional()
  @IsEnum(MedicationStatus)
  status?: MedicationStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isCheck?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  comments?: string;
}
