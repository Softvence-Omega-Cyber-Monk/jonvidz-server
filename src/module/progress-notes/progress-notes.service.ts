import { Injectable } from '@nestjs/common';
import { CreateProgressNoteDto } from './dto/create-progress-note.dto';
import { UpdateProgressNoteDto } from './dto/update-progress-note.dto';

@Injectable()
export class ProgressNotesService {
  create(createProgressNoteDto: CreateProgressNoteDto) {
    return 'This action adds a new progressNote';
  }

  findAll() {
    return `This action returns all progressNotes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} progressNote`;
  }

  update(id: number, updateProgressNoteDto: UpdateProgressNoteDto) {
    return `This action updates a #${id} progressNote`;
  }

  remove(id: number) {
    return `This action removes a #${id} progressNote`;
  }
}
