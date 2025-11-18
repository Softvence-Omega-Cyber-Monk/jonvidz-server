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
import { FlowSheetService } from './flow-sheet.service';
import { CreateFlowSheetDto } from './dto/create-flow-sheet.dto';
import { UpdateFlowSheetDto } from './dto/update-flow-sheet.dto';
import { Response } from 'express';
import sendResponse from '../../utils/sendResponse';

@Controller('flow-sheet')
export class FlowSheetController {
  constructor(private readonly flowSheetService: FlowSheetService) {}

  @Post()
  async create(@Body() createFlowSheetDto: CreateFlowSheetDto,@Res() res: Response) {
    const data = await this.flowSheetService.create(createFlowSheetDto);
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'FlowSheet created successfully.',
      data,
    });
  }

  @Get()
  findAll() {
    return this.flowSheetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flowSheetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlowSheetDto: UpdateFlowSheetDto) {
    return this.flowSheetService.update(+id, updateFlowSheetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flowSheetService.remove(+id);
  }
}
