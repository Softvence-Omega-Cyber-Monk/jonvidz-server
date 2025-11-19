import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus
} from '@nestjs/common';
import { SuctionLogService } from './suction-log.service';
import { UpdateSuctionLogDto } from './dto/update-suction-log.dto';
import { Response } from 'express';
import sendResponse from '../../utils/sendResponse';

@Controller('suction-log')
export class SuctionLogController {
  constructor(private readonly suctionLogService: SuctionLogService) {}

  // @Post()
  // create(@Body() createSuctionLogDto: CreateSuctionLogDto) {
  //   return this.suctionLogService.create(createSuctionLogDto);
  // }

  @Get()
  async findAll(@Res() res: Response) {
    const data = await this.suctionLogService.findAll();
    if (!data || data.length === 0) {
      return sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'No suction log data found',
        data: [],
      });
    }
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Suction Log retrieve successfully.',
      data,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const data = await this.suctionLogService.findOne(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Suction Log retrieve successfully.',
      data,
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSuctionLogDto: UpdateSuctionLogDto, @Res() res: Response) {
    const data = await this.suctionLogService.update(id, updateSuctionLogDto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Suction Log updated successfully.',
      data,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const data = await this.suctionLogService.remove(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Suction Log deleted successfully.',
      data,
    });
  }
}
