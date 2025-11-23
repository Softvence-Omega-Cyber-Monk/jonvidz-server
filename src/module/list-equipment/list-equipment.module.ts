import { Module } from '@nestjs/common';
import { ListEquipmentService } from './list-equipment.service';
import { ListEquipmentController } from './list-equipment.controller';

@Module({
  controllers: [ListEquipmentController],
  providers: [ListEquipmentService],
})
export class ListEquipmentModule {}
