import { Test, TestingModule } from '@nestjs/testing';
import { PatientCareAssignmentService } from './patient-care-assignment.service';

describe('PatientCareAssignmentService', () => {
  let service: PatientCareAssignmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientCareAssignmentService],
    }).compile();

    service = module.get<PatientCareAssignmentService>(PatientCareAssignmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
