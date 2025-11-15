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
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
