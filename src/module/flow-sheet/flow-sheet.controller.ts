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
import { PrismaService } from '../../prisma/prisma.service';

@Controller('flow-sheet')
export class FlowSheetController {
  constructor(private readonly flowSheetService: FlowSheetService,
              private readonly prisma: PrismaService) {}

  // @Post()
  // async create(@Body() createFlowSheetDto: CreateFlowSheetDto,@Res() res: Response) {
  //   const data = await this.flowSheetService.create(createFlowSheetDto);
  //   return sendResponse(res, {
  //     statusCode: HttpStatus.CREATED,
  //     success: true,
  //     message: 'FlowSheet created successfully.',
  //     data,
  //   });
  // }

  @Get()
  async findAll(@Res() res: Response) {
    const data = await this.flowSheetService.findAll();
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'FlowSheet retrieve successfully.',
      data,
    })
  }

  @Get(':id')
  async patientCareAssignmentById(@Param('id') id: string,@Res() res: Response) {
    const data = await this.flowSheetService.patientCareAssignmentById(id);
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'PatientCareAssignmentById FlowSheet retrieve successfully.',
      data,
    })
  }

  @Get(':id')
  async findOne(@Param('id') id: string,@Res() res: Response) {
    const data = await this.flowSheetService.findOne(id);
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'FlowSheet retrieve successfully.',
      data,
    })
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateFlowSheetDto,@Res() res: Response) {
    const data = await this.flowSheetService.update(id, dto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'FlowSheet updated successfully.',
      data,
    })
  }

  @Delete(':id')
  async remove(@Param('id') id: string,@Res() res: Response) {
    const data = await this.flowSheetService.remove(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'FlowSheet deleted successfully.',
      data,
    })
  }
}
