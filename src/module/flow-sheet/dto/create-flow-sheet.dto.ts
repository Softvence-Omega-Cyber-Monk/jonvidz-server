import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowSheetDto {
  @ApiProperty({ description: 'write notes/comments here', example: 'notes/comments' })
  @IsOptional()
  @IsString()
  comments?: string;
  @ApiProperty({ description: 'Digital Initials/Signature here', example: 'ELON' })
  @IsOptional()
  @IsString()
  signature?: string;
  @ApiProperty({ description: 'staff user Id here', example: '07ca9ab9-e808-4c45-850a-2b7baafb1287' })
  @IsOptional()
  @IsString()
  userId?: string;
  @ApiProperty({ description: 'patientId here', example: '07ca9ab9-e808-4c45-850a-2b7baafb1288' })
  @IsString()
  patientId: string;

  // @IsOptional()
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => CreateVitalParametersDto)
  // vitalParameters?: CreateVitalParametersDto[];
  //
  // @IsOptional()
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => CreateVentSettingDto)
  // ventSettings?: CreateVentSettingDto[];
  //
  // @IsOptional()
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => CreateMeasuredDataDto)
  // measuredData?: CreateMeasuredDataDto[];
  //
  // @IsOptional()
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => CreateAlarmsParametersDto)
  // alarmsParameters?: CreateAlarmsParametersDto[];
  //
  // @IsOptional()
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => CreateOffVentMonitoringDto)
  // offVentMonitoring?: CreateOffVentMonitoringDto[];
}
