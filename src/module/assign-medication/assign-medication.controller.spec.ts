import { Test, TestingModule } from '@nestjs/testing';
import { AssignMedicationController } from './assign-medication.controller';
import { AssignMedicationService } from './assign-medication.service';

describe('AssignMedicationController', () => {
  let controller: AssignMedicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignMedicationController],
      providers: [AssignMedicationService],
    }).compile();

    controller = module.get<AssignMedicationController>(AssignMedicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
