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
import { AssignEquipmentService } from './assign-equipment.service';
import { CreateAssignEquipmentDto } from './dto/create-assign-equipment.dto';
import { UpdateAssignEquipmentDto } from './dto/update-assign-equipment.dto';
import { Response } from 'express';
import sendResponse from '../../utils/sendResponse';

@Controller('assign-equipment')
export class AssignEquipmentController {
  constructor(private readonly assignEquipmentService: AssignEquipmentService) {}

  @Post()
  async create(@Body() createAssignEquipmentDto: CreateAssignEquipmentDto,@Res() res: Response) {

    const data = await this.assignEquipmentService.create(createAssignEquipmentDto);
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Assign Equipment successfully.',
      data,
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const data = await this.assignEquipmentService.findAll();
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Assign Equipment retrieve successfully.',
      data,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string,@Res() res: Response) {
    const data = await this.assignEquipmentService.findOne(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Assign Equipment retrieve successfully.',
      data,
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAssignEquipmentDto: UpdateAssignEquipmentDto, @Res() res: Response) {
    const data = await this.assignEquipmentService.update(id, updateAssignEquipmentDto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Assign Equipment updated successfully.',
      data,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string,@Res() res: Response) {
    const data = await this.assignEquipmentService.remove(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Assign Equipment deleted successfully.',
      data,
    });
  }
}
