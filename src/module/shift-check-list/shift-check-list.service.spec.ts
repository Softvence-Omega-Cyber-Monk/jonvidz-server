import { Test, TestingModule } from '@nestjs/testing';
import { ShiftCheckListService } from './shift-check-list.service';

describe('ShiftCheckListService', () => {
  let service: ShiftCheckListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShiftCheckListService],
    }).compile();

    service = module.get<ShiftCheckListService>(ShiftCheckListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
