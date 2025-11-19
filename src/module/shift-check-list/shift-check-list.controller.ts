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
import { ShiftCheckListService } from './shift-check-list.service';
import { CreateShiftCheckListDto } from './dto/create-shift-check-list.dto';
import { UpdateShiftCheckListDto } from './dto/update-shift-check-list.dto';
import { Response } from 'express';
import sendResponse from '../../utils/sendResponse';

@Controller('shift-check-list')
export class ShiftCheckListController {
  constructor(private readonly shiftCheckListService: ShiftCheckListService) {}

  @Post()
  async create(@Body() createShiftCheckListDto: CreateShiftCheckListDto,@Res() res: Response) {
    const data = await this.shiftCheckListService.create(createShiftCheckListDto);
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Shift Check List created successfully.',
      data,
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const data= await this.shiftCheckListService.findAll();
    if (!data || data.length === 0) {
      return sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Shift Check List data not found',
        data: [],
      });
    }
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Shift Check List retrieve successfully.',
      data,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const data = await this.shiftCheckListService.findOne(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Shift Check List retrieve successfully.',
      data,
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateShiftCheckListDto: UpdateShiftCheckListDto, @Res() res: Response) {
    const data = await this.shiftCheckListService.update(id, updateShiftCheckListDto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Shift Check List updated successfully.',
      data,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const data = await this.shiftCheckListService.remove(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Shift Check List deleted successfully.',
      data,
    });
  }
}
