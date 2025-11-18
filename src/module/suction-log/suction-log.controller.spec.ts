import { Test, TestingModule } from '@nestjs/testing';
import { SuctionLogController } from './suction-log.controller';
import { SuctionLogService } from './suction-log.service';

describe('SuctionLogController', () => {
  let controller: SuctionLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuctionLogController],
      providers: [SuctionLogService],
    }).compile();

    controller = module.get<SuctionLogController>(SuctionLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
