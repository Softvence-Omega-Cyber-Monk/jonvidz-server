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
import { ListEquipmentService } from './list-equipment.service';
import { CreateListEquipmentDto } from './dto/create-list-equipment.dto';
import { UpdateListEquipmentDto } from './dto/update-list-equipment.dto';
import { Response } from 'express';
import sendResponse from '../../utils/sendResponse';

@Controller('list-equipment')
export class ListEquipmentController {
  constructor(private readonly listEquipmentService: ListEquipmentService) {}

  // @Post()
  // create(@Body() createListEquipmentDto: CreateListEquipmentDto) {
  //   return this.listEquipmentService.create(createListEquipmentDto);
  // }

  @Get()
  async findAll(@Res() res: Response) {
    const data = await this.listEquipmentService.findAll();
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'ListOfEquipment retrieve successfully.',
      data,
    });
  }
  @Get('patientCareAssignmentId/:id')
  async patientCareAssignmentById(@Param('id') id: string, @Res() res: Response) {
    const data = await this.listEquipmentService.patientCareAssignmentById(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'List of Equipment retrieve successfully.',
      data,
    });
  }
  @Get(':id')
  async findOne(@Param('id') id: string,@Res() res: Response) {
    const data = await this.listEquipmentService.findOne(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Equipment retrieve successfully.',
      data,
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateListEquipmentDto: UpdateListEquipmentDto, @Res() res: Response) {
    const data = await this.listEquipmentService.update(id, updateListEquipmentDto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Equipment updated successfully.',
      data,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const data = await this.listEquipmentService.remove(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Equipment deleted successfully.',
      data,
    });
  }
}
