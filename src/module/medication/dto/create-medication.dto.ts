import { ApiProperty } from '@nestjs/swagger';;
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { MedicationRoute } from '@prisma/client';

export class CreateMedicationDto {
  @ApiProperty({ description: 'Unique name of the medication', example: 'Amoxicillin' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Standard dose and unit, e.g., "250 mg", "2.5 mg/3mL"', example: '250 mg' })
  @IsNotEmpty()
  @IsString()
  standardDose: string;

  @ApiProperty({
    description: 'Route of administration',
    enum: MedicationRoute, // Use the generated Prisma enum
    example: MedicationRoute.ORAL
  })
  @IsNotEmpty()
  @IsEnum(MedicationRoute)
  route: MedicationRoute;
}