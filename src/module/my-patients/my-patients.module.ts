import { Module } from '@nestjs/common';
import { MyPatientsService } from './my-patients.service';
import { MyPatientsController } from './my-patients.controller';

@Module({
  controllers: [MyPatientsController],
  providers: [MyPatientsService],
})
export class MyPatientsModule {}
