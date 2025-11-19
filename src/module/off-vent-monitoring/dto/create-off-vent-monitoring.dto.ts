import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsInt, IsBoolean, IsEnum } from 'class-validator';

export enum MonitoringMode {
  Trach_Cool_Aerosol_Mist = 'Trach_Cool_Aerosol_Mist',
  Trach_HME = 'Trach_HME'
}

export class CreateOffVentMonitoringDto {
  @ApiProperty({
    required: false,
    enum: MonitoringMode,
    description: 'Monitoring mode type'
  })
  @IsOptional()
  @IsEnum(MonitoringMode)
  monitoringMode?: MonitoringMode;

  @ApiProperty({
    required: false,
    description: 'Whether O2 bleed is enabled'
  })
  @IsOptional()
  @IsBoolean()
  withO2BleedIn?: boolean;

  @ApiProperty({
    required: false,
    description: 'O2 flow rate in L/min (e.g., 0.50 L/min)',
    type: Number
  })
  @IsOptional()
  @IsNumber()
  oto_low_l_min?: number;

  @ApiProperty({
    required: false,
    description: 'Oxygen saturation percentage (SpO2)'
  })
  @IsOptional()
  @IsInt()
  spoto_percent?: number;

  @ApiProperty({
    required: false,
    description: 'Heart rate in beats per minute'
  })
  @IsOptional()
  @IsInt()
  hr_bpm?: number;

  @ApiProperty({
    required: false,
    description: 'Respiratory rate in breaths per minute'
  })
  @IsOptional()
  @IsInt()
  rr_bpm?: number;

  @ApiProperty({
    required: false,
    description: 'Monitoring start time'
  })
  @IsOptional()
  startTime?: Date;

  @ApiProperty({
    required: false,
    description: 'Monitoring end time'
  })
  @IsOptional()
  endTime?: Date;

  @ApiProperty({ description: 'Flow sheet ID' })
  @IsString()
  flowSheetId: string;

  @ApiProperty({ description: 'Patient ID' })
  @IsString()
  patientId: string;
}