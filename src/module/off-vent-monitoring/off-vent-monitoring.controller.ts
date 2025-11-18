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
import { OffVentMonitoringService } from './off-vent-monitoring.service';
import sendResponse from '../../utils/sendResponse';
import { UpdateOffVentMonitoringDto } from './dto/update-off-vent-monitoring.dto';
import { Response } from 'express';

@Controller('off-vent-monitoring')
export class OffVentMonitoringController {
  constructor(private readonly offVentMonitoringService: OffVentMonitoringService) {}

  // @Post()
  // create(@Body() createOffVentMonitoringDto: CreateOffVentMonitoringDto) {
  //   return this.offVentMonitoringService.create(createOffVentMonitoringDto);
  // }

  @Get()
  async findAll(@Res() res: Response) {
    const data= await this.offVentMonitoringService.findAll();
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'OffVentMonitoring retrieve successfully.',
      data,
    })
  }

  @Get(':id')
  async findOne(@Param('id') id: string,@Res() res: Response) {
    const data= await this.offVentMonitoringService.findOne(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'OffVentMonitoring retrieve successfully.',
      data,
    })
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateOffVentMonitoringDto, @Res() res: Response) {
    const data = await this.offVentMonitoringService.update(id, dto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'OffVentMonitoring updated successfully.',
      data,
    })
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const data = await this.offVentMonitoringService.remove(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'OffVentMonitoring deleted successfully.',
      data,
    })
  }
}
