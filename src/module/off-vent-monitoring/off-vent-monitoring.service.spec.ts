import { Test, TestingModule } from '@nestjs/testing';
import { OffVentMonitoringService } from './off-vent-monitoring.service';

describe('OffVentMonitoringService', () => {
  let service: OffVentMonitoringService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OffVentMonitoringService],
    }).compile();

    service = module.get<OffVentMonitoringService>(OffVentMonitoringService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
