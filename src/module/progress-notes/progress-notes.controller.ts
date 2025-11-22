import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ProgressNotesService } from './progress-notes.service';
import { CreateProgressNoteDto } from './dto/create-progress-note.dto';
import { UpdateProgressNoteDto } from './dto/update-progress-note.dto';
import { Response } from 'express';
import sendResponse from '../../utils/sendResponse';

@Controller('progress-notes')
export class ProgressNotesController {
  constructor(private readonly progressNotesService: ProgressNotesService) {}

  // @Post()
  // create(@Body() createProgressNoteDto: CreateProgressNoteDto) {
  //   return this.progressNotesService.create(createProgressNoteDto);
  // }

  @Get()
  async findAll(@Res() res: Response) {
    const data=await this.progressNotesService.findAll();
    if (!data || data.length === 0) {
      return sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'No progress Notes data found',
        data: [],
      });
    }
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Progress Notes retrieve successfully.',
      data,
    });
  }

  @Get('patientCareAssignmentById:id')
  async patientCareAssignmentById(@Param('id') id: string, @Res() res: Response) {
    const data = await this.progressNotesService.patientCareAssignmentById(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Progress Notes retrieve successfully.',
      data,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const data = await this.progressNotesService.findOne(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Progress Notes retrieve successfully.',
      data,
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProgressNoteDto: UpdateProgressNoteDto, @Res() res: Response) {
    const data = await this.progressNotesService.update(id, updateProgressNoteDto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Progress Notes  successfully.',
      data,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const data = await this.progressNotesService.remove(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Progress Notes deleted successfully.',
      data,
    });
  }
}
