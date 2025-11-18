import { Test, TestingModule } from '@nestjs/testing';
import { FlowSheetController } from './flow-sheet.controller';
import { FlowSheetService } from './flow-sheet.service';

describe('FlowSheetController', () => {
  let controller: FlowSheetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlowSheetController],
      providers: [FlowSheetService],
    }).compile();

    controller = module.get<FlowSheetController>(FlowSheetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
