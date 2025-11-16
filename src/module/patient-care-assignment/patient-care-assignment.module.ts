import { Module } from '@nestjs/common';
import { PatientCareAssignmentService } from './patient-care-assignment.service';
import { PatientCareAssignmentController } from './patient-care-assignment.controller';
import { AuditLogModule } from '../audit_log/audit_log.module';

@Module({
  imports: [AuditLogModule],
  controllers: [PatientCareAssignmentController],
  providers: [PatientCareAssignmentService],
})
export class PatientCareAssignmentModule {}
