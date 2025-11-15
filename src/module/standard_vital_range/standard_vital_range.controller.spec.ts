import { Test, TestingModule } from '@nestjs/testing';
import { StandardVitalRangeController } from './standard_vital_range.controller';
import { StandardVitalRangeService } from './standard_vital_range.service';

describe('StandardVitalRangeController', () => {
  let controller: StandardVitalRangeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StandardVitalRangeController],
      providers: [StandardVitalRangeService],
    }).compile();

    controller = module.get<StandardVitalRangeController>(StandardVitalRangeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
