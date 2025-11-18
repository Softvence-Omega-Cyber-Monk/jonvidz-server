import { Module } from '@nestjs/common';
import { ProgressNotesService } from './progress-notes.service';
import { ProgressNotesController } from './progress-notes.controller';

@Module({
  controllers: [ProgressNotesController],
  providers: [ProgressNotesService],
})
export class ProgressNotesModule {}
