import { Test, TestingModule } from '@nestjs/testing';
import { FlowSheetService } from './flow-sheet.service';

describe('FlowSheetService', () => {
  let service: FlowSheetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlowSheetService],
    }).compile();

    service = module.get<FlowSheetService>(FlowSheetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
