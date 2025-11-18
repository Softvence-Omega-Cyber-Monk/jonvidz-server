import { Test, TestingModule } from '@nestjs/testing';
import { MeasuredDataService } from './measured-data.service';

describe('MeasuredDataService', () => {
  let service: MeasuredDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeasuredDataService],
    }).compile();

    service = module.get<MeasuredDataService>(MeasuredDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
