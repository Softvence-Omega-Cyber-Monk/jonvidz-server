import {
  IsOptional,
  IsString,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMyProfileDto {
  //@ApiProperty({ example: 'user@Gmail.com', description: 'user email address' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'Sarah', description: 'Full name of the User' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: '0190000', description: 'phone member (Optional)', required: false })
  @IsString()
  @IsOptional()
  phone?: string;
}
