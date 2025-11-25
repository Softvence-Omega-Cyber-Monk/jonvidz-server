import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { SystemDefaultService } from './system-default.service';
//import { CreateSystemDefaultDto } from './dto/create-system-default.dto';
import { UpdateSystemDefaultDto } from './dto/update-system-default.dto';
import { CreateSystemDefaultDto } from './dto/create-system-default.dto';
import sendResponse from '../../utils/sendResponse';
import { Request, Response } from 'express';

// Implement Here System-Config and System-log
@Controller('system-default')
export class SystemDefaultController {
  constructor(private readonly systemDefaultService: SystemDefaultService) {}

  @Post()
  async create(@Body() createSystemDefaultDto: CreateSystemDefaultDto, @Res() res: Response) {
    const data = await this.systemDefaultService.create(createSystemDefaultDto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'system default data created successfully.',
      data
    });
  }

  @Get()
  async findAll( @Res() res: Response) {
    const data = await this.systemDefaultService.findAll();
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'system data retrieved successfully.',
      data
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const data = await this.systemDefaultService.findOne(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'system data retrieved successfully.',
      data
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSystemDefaultDto: UpdateSystemDefaultDto, @Res() res: Response) {
    const data= await this.systemDefaultService.update(id, updateSystemDefaultDto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'system data updated successfully.',
      data
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const data = await this.systemDefaultService.remove(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'system data successfully.',
      data
    });
  }
}
