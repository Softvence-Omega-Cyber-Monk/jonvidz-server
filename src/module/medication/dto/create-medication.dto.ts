import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MedicationRoute } from '@prisma/client';

export class CreateMedicationDto {
  @ApiProperty({ example: 'Albuterol' })
  @IsString()
  @IsNotEmpty()
  name: string;

  // @ApiProperty({ example: 'Albuterol' })
  // @IsString()
  // @IsNotEmpty()
  // medicationId: string; // <-- required field

  @ApiProperty({ example: '2.5 mg/3mL' })
  @IsString()
  @IsNotEmpty()
  standardDose: string;

  @ApiProperty({ example: 'NEB', enum: MedicationRoute })
  @IsEnum(MedicationRoute)
  @IsOptional()
  route?: MedicationRoute;
}


