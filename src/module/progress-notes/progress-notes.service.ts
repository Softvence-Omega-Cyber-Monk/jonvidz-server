import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProgressNoteDto } from './dto/create-progress-note.dto';
import { UpdateProgressNoteDto } from './dto/update-progress-note.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProgressNotesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createProgressNoteDto: CreateProgressNoteDto) {
    return 'This action adds a new progressNote';
  }

  async findAll() {
    return this.prisma.progressNotes.findMany();
  }

  async patientCareAssignmentById(id: string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const isExists = await this.prisma.progressNotes.findUnique({
      where: { patientCareAssignmentId:id }
    });
    if (!isExists) {
      throw new NotFoundException(`Progression Notes with ID ${id} not found`);
    }
    return this.prisma.progressNotes.findUnique({where: {patientCareAssignmentId:id}});
  }

  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const isExists = await this.prisma.progressNotes.findUnique({
      where: {id }
    });
    if (!isExists) {
      throw new NotFoundException(`Progression Notes with ID ${id} not found`);
    }

    return this.prisma.progressNotes.findUnique({where: {id}});
  }

  async update(id: string, updateProgressNoteDto: UpdateProgressNoteDto) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const isExists = await this.prisma.progressNotes.findUnique({
      where: {id }
    });
    if (!isExists) {
      throw new NotFoundException(`Progression Notes with ID ${id} not found`);
    }
    return this.prisma.progressNotes.update({where: { id },
      data: updateProgressNoteDto});
  }

  async remove(id: string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const isExists = await this.prisma.progressNotes.findUnique({
      where: { id }
    });
    if (!isExists) {
      throw new NotFoundException(`Progress Notes with ID ${id} not found`);
    }
    return this.prisma.progressNotes.delete({where: {id}});
  }
}
