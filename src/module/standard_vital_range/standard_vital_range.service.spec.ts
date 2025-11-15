import { Test, TestingModule } from '@nestjs/testing';
import { StandardVitalRangeService } from './standard_vital_range.service';

describe('StandardVitalRangeService', () => {
  let service: StandardVitalRangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StandardVitalRangeService],
    }).compile();

    service = module.get<StandardVitalRangeService>(StandardVitalRangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
