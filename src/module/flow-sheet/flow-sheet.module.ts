import { Module } from '@nestjs/common';
import { FlowSheetService } from './flow-sheet.service';
import { FlowSheetController } from './flow-sheet.controller';

@Module({
  controllers: [FlowSheetController],
  providers: [FlowSheetService],
})
export class FlowSheetModule {}
