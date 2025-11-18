import { Module } from '@nestjs/common';
import { MeasuredDataService } from './measured-data.service';
import { MeasuredDataController } from './measured-data.controller';

@Module({
  controllers: [MeasuredDataController],
  providers: [MeasuredDataService],
})
export class MeasuredDataModule {}
