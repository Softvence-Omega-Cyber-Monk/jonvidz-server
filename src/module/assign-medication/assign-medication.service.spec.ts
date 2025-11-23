import { Test, TestingModule } from '@nestjs/testing';
import { AssignMedicationService } from './assign-medication.service';

describe('AssignMedicationService', () => {
  let service: AssignMedicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignMedicationService],
    }).compile();

    service = module.get<AssignMedicationService>(AssignMedicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
