import { Test, TestingModule } from '@nestjs/testing';
import { SystemDefaultService } from './system-default.service';

describe('SystemDefaultService', () => {
  let service: SystemDefaultService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemDefaultService],
    }).compile();

    service = module.get<SystemDefaultService>(SystemDefaultService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
