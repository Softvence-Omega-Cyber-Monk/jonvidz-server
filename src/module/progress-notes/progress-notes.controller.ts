import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgressNotesService } from './progress-notes.service';
import { CreateProgressNoteDto } from './dto/create-progress-note.dto';
import { UpdateProgressNoteDto } from './dto/update-progress-note.dto';

@Controller('progress-notes')
export class ProgressNotesController {
  constructor(private readonly progressNotesService: ProgressNotesService) {}

  @Post()
  create(@Body() createProgressNoteDto: CreateProgressNoteDto) {
    return this.progressNotesService.create(createProgressNoteDto);
  }

  @Get()
  findAll() {
    return this.progressNotesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.progressNotesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgressNoteDto: UpdateProgressNoteDto) {
    return this.progressNotesService.update(+id, updateProgressNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.progressNotesService.remove(+id);
  }
}
