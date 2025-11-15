import { Test, TestingModule } from '@nestjs/testing';
import { PatientCareAssignmentController } from './patient-care-assignment.controller';
import { PatientCareAssignmentService } from './patient-care-assignment.service';

describe('PatientCareAssignmentController', () => {
  let controller: PatientCareAssignmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientCareAssignmentController],
      providers: [PatientCareAssignmentService],
    }).compile();

    controller = module.get<PatientCareAssignmentController>(PatientCareAssignmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
