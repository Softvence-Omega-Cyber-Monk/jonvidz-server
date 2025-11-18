import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { PatientCareAssignmentModule } from './module/patient-care-assignment/patient-care-assignment.module';
import { MedicationModule } from './module/medication/medication.module';
import { EquipmentModule } from './module/equipment/equipment.module';
import { StandardVitalRangeModule } from './module/standard_vital_range/standard_vital_range.module';
import { AuditLogModule } from './module/audit_log/audit_log.module';
import { PatientModule } from './module/patient/patient.module';
import { RoomModule } from './module/room/room.module';
import { StaffModule } from './module/staff/staff.module';
import { MyPatientsModule } from './module/my-patients/my-patients.module';
import { FlowSheetModule } from './module/flow-sheet/flow-sheet.module';
import { MarModule } from './module/mar/mar.module';
import { SuctionLogModule } from './module/suction-log/suction-log.module';
import { ProgressNotesModule } from './module/progress-notes/progress-notes.module';
import { OffVentMonitoringModule } from './module/off-vent-monitoring/off-vent-monitoring.module';
import { MeasuredDataModule } from './module/measured-data/measured-data.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
     ConfigModule.forRoot({ isGlobal: true }),
      PrismaModule,
      UserModule,
      AuthModule,
      PatientCareAssignmentModule,
      MedicationModule,
      EquipmentModule,
      StandardVitalRangeModule,
      AuditLogModule,
      PatientModule,
      RoomModule,
      StaffModule,
      MyPatientsModule,
      FlowSheetModule,
      MarModule,
      SuctionLogModule,
      ProgressNotesModule,
      OffVentMonitoringModule,
      MeasuredDataModule,
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
