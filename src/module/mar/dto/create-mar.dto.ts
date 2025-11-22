import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';

export class CreateMarDto {

  @ApiProperty({ example: 'f0feb326-a697-49b1-ac17-b3deff5347d9' })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  patientId: string;

  // @ApiProperty({ example: 'f0feb326-a697-49b1-ac17-b3deff5347d9' })
  // @IsString()
  // @IsUUID()
  // //@IsNotEmpty()
  // medicationId?: string;

  @ApiProperty({ example: 'f0feb326-a697-49b1-ac17-b3deff5347d9' })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  patientCareAssignmentId: string;
}
