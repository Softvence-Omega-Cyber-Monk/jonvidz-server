import { Module } from '@nestjs/common';
import { PatientCareAssignmentService } from './patient-care-assignment.service';
import { PatientCareAssignmentController } from './patient-care-assignment.controller';

@Module({
  controllers: [PatientCareAssignmentController],
  providers: [PatientCareAssignmentService],
})
export class PatientCareAssignmentModule {}
