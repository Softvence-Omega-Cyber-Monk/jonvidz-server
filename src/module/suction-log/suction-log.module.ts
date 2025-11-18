import { Module } from '@nestjs/common';
import { SuctionLogService } from './suction-log.service';
import { SuctionLogController } from './suction-log.controller';

@Module({
  controllers: [SuctionLogController],
  providers: [SuctionLogService],
})
export class SuctionLogModule {}
