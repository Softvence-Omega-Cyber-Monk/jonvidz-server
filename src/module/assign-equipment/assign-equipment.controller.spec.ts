import { Test, TestingModule } from '@nestjs/testing';
import { AssignEquipmentController } from './assign-equipment.controller';
import { AssignEquipmentService } from './assign-equipment.service';

describe('AssignEquipmentController', () => {
  let controller: AssignEquipmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignEquipmentController],
      providers: [AssignEquipmentService],
    }).compile();

    controller = module.get<AssignEquipmentController>(AssignEquipmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
