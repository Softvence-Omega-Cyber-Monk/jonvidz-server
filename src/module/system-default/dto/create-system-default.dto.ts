import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ChartingPeriodTYpe } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
export class CreateSystemDefaultDto {
  @ApiPropertyOptional({
    description: 'Default timezone for the system',
    example: 'Asia/Dhaka',
  })
  defaultTimezone: string;

  @ApiPropertyOptional({
    description: 'Number of days to retain records',
    example: 30,
  })
  retentionDays: number;

  @ApiProperty({ example: 'MONTHLY', enum: ChartingPeriodTYpe })
  @IsEnum(ChartingPeriodTYpe)
  @IsOptional()
  chartingPeriod?: ChartingPeriodTYpe;
}

