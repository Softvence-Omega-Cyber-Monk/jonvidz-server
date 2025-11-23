import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AssignMedicationService } from './assign-medication.service';
import sendResponse from 'src/utils/sendResponse';
import { UpdateAssignMedicationDto } from './dto/update-assign-medication.dto';

import { Request, Response } from 'express';
import { CreateAssignMedicationDto } from './dto/create-assign-medication.dto';

@Controller('assign-medication')
export class AssignMedicationController {
  constructor(private readonly assignMedicationService: AssignMedicationService) {}

  @Post()
  async create(@Body() dto: CreateAssignMedicationDto,@Res() res: Response) {
    const data = await this.assignMedicationService.create(dto);
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'assign medication created successfully.',
      data,
    });
  }

  @Get()
  findAll() {
    return this.assignMedicationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignMedicationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssignMedicationDto: UpdateAssignMedicationDto) {
    return this.assignMedicationService.update(+id, updateAssignMedicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignMedicationService.remove(+id);
  }
}
