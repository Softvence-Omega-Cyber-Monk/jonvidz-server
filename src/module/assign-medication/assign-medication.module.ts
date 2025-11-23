import { Module } from '@nestjs/common';
import { AssignMedicationService } from './assign-medication.service';
import { AssignMedicationController } from './assign-medication.controller';

@Module({
  controllers: [AssignMedicationController],
  providers: [AssignMedicationService],
})
export class AssignMedicationModule {}
