import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';


export class UpdateOffVentMonitoringDto {
  @ApiProperty({ required: false, enum: ['Trach_Cool_Aerosol_Mist', 'Trach_HME'] })
  @IsOptional()
  @IsString()
  monitoringMode?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  withO2BleedIn?: boolean;

  @ApiProperty({ required: false, type: Number, description: 'O2 flow rate in L/min' })
  @IsOptional()
  oto_low_l_min?: number;

  @ApiProperty({ required: false, description: 'Oxygen saturation percentage' })
  @IsOptional()
  spoto_percent?: number;

  @ApiProperty({ required: false, description: 'Heart rate in BPM' })
  @IsOptional()
  hr_bpm?: number;

  @ApiProperty({ required: false, description: 'Respiratory rate in BPM' })
  @IsOptional()
  rr_bpm?: number;

}

// Measured Data Update DTO
export class UpdateMeasuredDataDto {
  @ApiProperty({ required: false, description: 'PIP in cmH2O' })
  @IsOptional()
  pip_cmh_2_o?: number;

  @ApiProperty({ required: false, description: 'PEEP in cmH2O' })
  @IsOptional()
  peep_cmh_2_o?: number;

  @ApiProperty({ required: false, description: 'Mean pressure in cmH2O' })
  @IsOptional()
  pmean_cmh_2_o?: number;

  @ApiProperty({ required: false, description: 'Leak in cmH2O' })
  @IsOptional()
  leak_cmh_2_o?: number;

  @ApiProperty({ required: false, type: Number, description: 'Minute volume in L/min' })
  @IsOptional()
  mve_l_min?: number;

  @ApiProperty({ required: false, description: 'Tidal volume in mL' })
  @IsOptional()
  vte_ml?: number;

  @ApiProperty({ required: false, description: 'Total respiratory rate' })
  @IsOptional()
  total_rate?: number;

  @ApiProperty({ required: false, description: 'Spontaneous respiratory rate' })
  @IsOptional()
  spont_rate?: number;

  @ApiProperty({ required: false, description: 'Expiratory time' })
  @IsOptional()
  e_time?: number;

  @ApiProperty({ required: false, description: 'Inspiratory time' })
  @IsOptional()
  i_time?: number;
}

// Alarms Parameters Update DTO
export class UpdateAlarmsParametersDto {
  @ApiProperty({ required: false, description: 'High pressure alarm' })
  @IsOptional()
  hi_p?: number;

  @ApiProperty({ required: false, description: 'Low pressure alarm' })
  @IsOptional()
  lo_p?: number;

  @ApiProperty({ required: false, description: 'Low minute volume alarm' })
  @IsOptional()
  low_ve?: number;

  @ApiProperty({ required: false, description: 'Apnea alarm in seconds' })
  @IsOptional()
  apnea_s?: number;

  @ApiProperty({ required: false, description: 'Head of bed elevation' })
  @IsOptional()
  head_of_bed?: number;

  @ApiProperty({ required: false, description: 'PMV setting' })
  @IsOptional()
  pmv?: number;

  @ApiProperty({ required: false, enum: ['Normal', 'Abnormal'], description: 'Status' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ required: false, enum: ['Given', 'Not_Given'], description: 'Medication status' })
  @IsOptional()
  @IsString()
  medication?: string;
}

// Vent Setting Update DTO
export class UpdateVentSettingDto {
  @ApiProperty({ required: false, description: 'Tidal volume or pressure' })
  @IsOptional()
  tidalVolumeOrPressure?: number;

  @ApiProperty({ required: false, description: 'Inspiratory time in seconds' })
  @IsOptional()
  iTimeSec?: number;

  @ApiProperty({ required: false, description: 'I:E ratio' })
  @IsOptional()
  ieRatio?: number;

  @ApiProperty({ required: false, description: 'Rise time' })
  @IsOptional()
  riseTime?: number;

  @ApiProperty({ required: false, description: 'Inspiratory trigger' })
  @IsOptional()
  iTrigger?: number;

  @ApiProperty({ required: false, description: 'FiO2 percentage' })
  @IsOptional()
  fiO2Pct?: number;

  @ApiProperty({ required: false, description: 'Heated humidifier temperature' })
  @IsOptional()
  heatedHumidifierTemp?: number;
}

// Vital Parameters Update DTO
export class UpdateVitalParametersDto {
  @ApiProperty({ required: false, description: 'Heart rate in BPM' })
  @IsOptional()
  hrBPM?: number;

  @ApiProperty({ required: false, description: 'Respiratory rate in BPM' })
  @IsOptional()
  rrBPM?: number;

  @ApiProperty({ required: false, description: 'Oxygen saturation percentage' })
  @IsOptional()
  spO2Pct?: number;

  @ApiProperty({
    required: false,
    enum: ['AC_VC', 'AC_PC', 'SIMV_VC', 'SIMV_PC', 'PSV', 'CPAP'],
    description: 'Ventilation mode'
  })
  @IsOptional()
  @IsString()
  ventMode?: string;

  @ApiProperty({
    required: false,
    enum: ['Cuffed', 'Uncuffed', 'Fenestrated'],
    description: 'Tracheostomy type'
  })
  @IsOptional()
  @IsString()
  trachType?: string;


}

// Main Flow Sheet Update DTO
export class UpdateFlowSheetDto {
  @ApiProperty({ required: false, description: 'Comments' })
  @IsOptional()
  @IsString()
  comments?: string;

  @ApiProperty({ required: false, description: 'Signature' })
  @IsOptional()
  @IsString()
  signature?: string;

  //@ApiProperty({ required: false, description: 'User ID' })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiProperty({
    required: false,
    type: UpdateOffVentMonitoringDto,
    description: 'Off-vent monitoring data'
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateOffVentMonitoringDto)
  off_vent_monitoring?: UpdateOffVentMonitoringDto;

  @ApiProperty({
    required: false,
    type: UpdateMeasuredDataDto,
    description: 'Measured data'
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateMeasuredDataDto)
  measured_data?: UpdateMeasuredDataDto;

  @ApiProperty({
    required: false,
    type: UpdateAlarmsParametersDto,
    description: 'Alarms parameters'
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateAlarmsParametersDto)
  alarms_parameters?: UpdateAlarmsParametersDto;

  @ApiProperty({
    required: false,
    type: UpdateVentSettingDto,
    description: 'Ventilator settings'
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateVentSettingDto)
  vent_setting?: UpdateVentSettingDto;

  @ApiProperty({
    required: false,
    type: UpdateVitalParametersDto,
    description: 'Vital parameters'
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateVitalParametersDto)
  vital_parameters?: UpdateVitalParametersDto;
}