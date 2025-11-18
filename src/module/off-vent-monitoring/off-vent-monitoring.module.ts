import { Module } from '@nestjs/common';
import { OffVentMonitoringService } from './off-vent-monitoring.service';
import { OffVentMonitoringController } from './off-vent-monitoring.controller';

@Module({
  controllers: [OffVentMonitoringController],
  providers: [OffVentMonitoringService],
})
export class OffVentMonitoringModule {}
