import { Test, TestingModule } from '@nestjs/testing';
import { SuctionLogService } from './suction-log.service';

describe('SuctionLogService', () => {
  let service: SuctionLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuctionLogService],
    }).compile();

    service = module.get<SuctionLogService>(SuctionLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
