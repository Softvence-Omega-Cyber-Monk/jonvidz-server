import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { MarService } from './mar.service';
import { UpdateMarDto } from './dto/update-mar.dto';
import { Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import { CreateMarDto } from './dto/create-mar.dto';

@Controller('mar')
export class MarController {
  constructor(private readonly marService: MarService) {}

  @Post()
  async create(@Body() createMarDto: CreateMarDto,@Res() res: Response) {
    const data = await this.marService.create(createMarDto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'MAR created successfully.',
      data,
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const data =await this.marService.findAll();
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'MAR retrieve successfully.',
      data,
    });
  }
  @Get('patientByMAR/:id')
  async patientByMAR(@Param('id') id: string, @Res() res: Response) {
    const data = await this.marService.patientByMAR(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'patientByMAR retrieve successfully.',
      data,
    });
  }
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const data = await this.marService.findOne(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'MAR retrieve successfully.',
      data,
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMarDto: UpdateMarDto, @Res() res: Response) {
    const data = await this.marService.update(id, updateMarDto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'MAR updated successfully.',
      data,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const data = await this.marService.remove(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'MAR Deleted successfully.',
      data,
    });
  }
}
