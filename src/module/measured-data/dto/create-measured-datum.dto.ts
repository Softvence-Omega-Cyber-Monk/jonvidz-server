import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsInt } from 'class-validator';

export class CreateMeasuredDatumDto {
  @ApiProperty({ required: false, description: 'PIP in cmH2O' })
  @IsOptional()
  @IsInt()
  pip_cmh_2_o?: number;

  @ApiProperty({ required: false, description: 'PEEP in cmH2O' })
  @IsOptional()
  @IsInt()
  peep_cmh_2_o?: number;

  @ApiProperty({ required: false, description: 'Mean pressure in cmH2O' })
  @IsOptional()
  @IsInt()
  pmean_cmh_2_o?: number;

  @ApiProperty({ required: false, description: 'Leak in cmH2O' })
  @IsOptional()
  @IsInt()
  leak_cmh_2_o?: number;

  @ApiProperty({ required: false, description: 'Minute volume in L/min', type: Number })
  @IsOptional()
  @IsNumber()
  mve_l_min?: number;

  @ApiProperty({ required: false, description: 'Tidal volume in mL' })
  @IsOptional()
  @IsInt()
  vte_ml?: number;

  @ApiProperty({ required: false, description: 'Total respiratory rate' })
  @IsOptional()
  @IsInt()
  total_rate?: number;

  @ApiProperty({ required: false, description: 'Spontaneous respiratory rate' })
  @IsOptional()
  @IsInt()
  spont_rate?: number;

  @ApiProperty({ required: false, description: 'Expiratory time' })
  @IsOptional()
  @IsInt()
  e_time?: number;

  @ApiProperty({ required: false, description: 'Inspiratory time' })
  @IsOptional()
  @IsInt()
  i_time?: number;

  @ApiProperty({ description: 'Flow sheet ID' })
  @IsString()
  flowSheetId: string;

  @ApiProperty({ description: 'Patient ID' })
  @IsString()
  patientId: string;
}