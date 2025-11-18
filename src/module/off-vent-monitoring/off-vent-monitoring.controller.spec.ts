import { Test, TestingModule } from '@nestjs/testing';
import { OffVentMonitoringController } from './off-vent-monitoring.controller';
import { OffVentMonitoringService } from './off-vent-monitoring.service';

describe('OffVentMonitoringController', () => {
  let controller: OffVentMonitoringController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OffVentMonitoringController],
      providers: [OffVentMonitoringService],
    }).compile();

    controller = module.get<OffVentMonitoringController>(OffVentMonitoringController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
