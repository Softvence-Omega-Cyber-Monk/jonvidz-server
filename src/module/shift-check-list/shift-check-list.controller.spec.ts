import { Test, TestingModule } from '@nestjs/testing';
import { ShiftCheckListController } from './shift-check-list.controller';
import { ShiftCheckListService } from './shift-check-list.service';

describe('ShiftCheckListController', () => {
  let controller: ShiftCheckListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShiftCheckListController],
      providers: [ShiftCheckListService],
    }).compile();

    controller = module.get<ShiftCheckListController>(ShiftCheckListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
