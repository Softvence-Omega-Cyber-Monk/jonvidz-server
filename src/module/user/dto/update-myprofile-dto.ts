import { IsOptional, IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMyProfileDto {
  //@ApiProperty({ example: 'user@Gmail.com', description: 'user email address' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'Sarah', description: 'Full name of the User' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Sarah', description: 'Full name of the User' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: '0190000',
    description: 'phone member (Optional)',
    required: false,
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ description: 'address', example: 'dhaka,Bangladesh' })
  @IsOptional()
  @IsString()
  emergencyName?: string;

  @ApiPropertyOptional({
    description: 'Contact number',
    example: '+8801XXXXXXXXX',
  })
  @IsOptional()
  @IsString()
  emergencyNumber?: string;
}
