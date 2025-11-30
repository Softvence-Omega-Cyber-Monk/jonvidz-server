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
  async findAll(@Res() res: Response) {
    const data= await this.assignMedicationService.findAll();
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'assign medication retrieve successfully.',
      data,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const data = await this.assignMedicationService.findOne(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'assign medication retrieve successfully.',
      data,
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAssignMedicationDto: UpdateAssignMedicationDto, @Res() res: Response) {
    const data = await this.assignMedicationService.update(id, updateAssignMedicationDto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'assign medication updated successfully.',
      data,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const data = await this.assignMedicationService.remove(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'assign medication deleted successfully.',
      data,
    });
  }
}
