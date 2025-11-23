import { Module } from '@nestjs/common';
import { AssignEquipmentService } from './assign-equipment.service';
import { AssignEquipmentController } from './assign-equipment.controller';

@Module({
  controllers: [AssignEquipmentController],
  providers: [AssignEquipmentService],
})
export class AssignEquipmentModule {}
