import { Module } from '@nestjs/common';
import { StandardVitalRangeService } from './standard_vital_range.service';
import { StandardVitalRangeController } from './standard_vital_range.controller';

@Module({
  controllers: [StandardVitalRangeController],
  providers: [StandardVitalRangeService],
})
export class StandardVitalRangeModule {}
