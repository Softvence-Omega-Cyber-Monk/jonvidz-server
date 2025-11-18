import {
  Controller,
  Get,
  //Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { MeasuredDataService } from './measured-data.service';
//import { CreateMeasuredDatumDto } from './dto/create-measured-datum.dto';
import { UpdateMeasuredDatumDto } from './dto/update-measured-datum.dto';
import sendResponse from '../../utils/sendResponse';
import { Response } from 'express';

@Controller('measured-data')
export class MeasuredDataController {
  constructor(private readonly measuredDataService: MeasuredDataService) {}

  // @Post()
  // create(@Body() createMeasuredDatumDto: CreateMeasuredDatumDto) {
  //   return this.measuredDataService.create(createMeasuredDatumDto);
  // }

  @Get()
  async findAll(@Res() res: Response) {
    const data = await this.measuredDataService.findAll();
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'measuredDatum retrieve successfully.',
      data,
    })
  }

  @Get(':id')
  async findOne(@Param('id') id: string,@Res() res: Response) {
    const data= await this.measuredDataService.findOne(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'measuredDatum retrieve successfully.',
      data,
    })
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMeasuredDatumDto: UpdateMeasuredDatumDto, @Res() res: Response) {
    const data = await this.measuredDataService.update(id, updateMeasuredDatumDto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'measuredDatum updated successfully.',
      data,
    })
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const data =await this.measuredDataService.remove(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'measuredDatum deleted successfully.',
      data,
    })
  }
}
