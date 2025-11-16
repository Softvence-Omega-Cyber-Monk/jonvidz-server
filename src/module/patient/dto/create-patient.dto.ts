import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePatientDto {
  // Patient Specific Fields
  @ApiProperty({ example: '1995-10-25', description: 'Date of Birth (ISO 8601 format)', format: 'date' })
  @IsDateString()
  @IsNotEmpty()
  dob: string;

  @ApiProperty({ example: 'MRN-90210', description: 'Optional Medical Record Number (if entered by staff)', required: false })
  @IsString()
  @IsOptional()
  medicalRecordNo?: string;

  @ApiProperty({ example: 'Female', description: 'Gender', required: false })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty({ example: 'Penicillin, Dust', description: 'Known patient allergies', required: false })
  @IsString()
  @IsOptional()
  allergies?: string;
}
