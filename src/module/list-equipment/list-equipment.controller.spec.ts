import { Test, TestingModule } from '@nestjs/testing';
import { ListEquipmentController } from './list-equipment.controller';
import { ListEquipmentService } from './list-equipment.service';

describe('ListEquipmentController', () => {
  let controller: ListEquipmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListEquipmentController],
      providers: [ListEquipmentService],
    }).compile();

    controller = module.get<ListEquipmentController>(ListEquipmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
