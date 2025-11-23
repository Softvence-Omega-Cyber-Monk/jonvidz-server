import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsArray, ValidateNested, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateListOfMedicationsDto {
  @ApiPropertyOptional()
  @IsString()
  id?: string;

  @ApiPropertyOptional()
  @IsString()
  time_of_record?: string;

  @ApiPropertyOptional()
  @IsString()
  schedule?: string;

  @ApiPropertyOptional()
  @IsString()
  status?: 'Given' | 'Not_Given' | 'Pending';

  @ApiPropertyOptional()
  @IsBoolean()
  isCheck?: boolean;

  @ApiPropertyOptional()
  @IsString()
  comments?: string;
}

export class UpdateMarDto {
  @ApiPropertyOptional()
  @IsString()
  comments?: string;

  @ApiPropertyOptional()
  @IsString()
  signature?: string;

  @ApiPropertyOptional()
  @IsString()
  time_of_record?: string;

  @ApiPropertyOptional()
  @IsString()
  full_e_cylinder?: string;

  @ApiPropertyOptional()
  @IsString()
  empty_e_cylinder?: string;

  @ApiPropertyOptional({ type: [UpdateListOfMedicationsDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateListOfMedicationsDto)
  listOfMadications?: UpdateListOfMedicationsDto[];
}
