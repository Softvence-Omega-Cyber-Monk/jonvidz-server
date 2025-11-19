import { Module } from '@nestjs/common';
import { ShiftCheckListService } from './shift-check-list.service';
import { ShiftCheckListController } from './shift-check-list.controller';

@Module({
  controllers: [ShiftCheckListController],
  providers: [ShiftCheckListService],
})
export class ShiftCheckListModule {}
