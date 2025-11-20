// import { ApiProperty } from '@nestjs/swagger';;
// import { IsNotEmpty, IsString } from 'class-validator';
//
//
// export class CreateMedicationDto {
//   @ApiProperty({ description: 'Unique name of the medication', example: 'Amoxicillin' })
//   @IsNotEmpty()
//   @IsString()
//   name: string;
//
//   @ApiProperty({ description: 'Standard dose and unit, e.g., "250 mg", "2.5 mg/3mL"', example: '250 mg' })
//   @IsNotEmpty()
//   @IsString()
//   standardDose: string;
//
//
// }


import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MedicationRoute } from '@prisma/client';

export class CreateMedicationDto {
  @ApiProperty({ example: 'Albuterol' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '2.5 mg/3mL' })
  @IsString()
  @IsNotEmpty()
  standardDose: string;

  @ApiProperty({ example: 'NEB', enum: MedicationRoute })
  @IsEnum(MedicationRoute)
  @IsOptional()
  route?: MedicationRoute;
}


