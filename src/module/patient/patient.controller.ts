import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import { ApiOperation } from '@nestjs/swagger';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  // @Post()
  // create(@Body() createPatientDto: CreatePatientDto) {
  //   return this.patientService.create(createPatientDto);
  // }

  @Get()
  @ApiOperation({ summary: 'Retrieve all patients with an active user account' })
  async findAll(@Req() req: Request, @Res() res: Response) {
    const data = await this.patientService.findAll();
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Patients retrieved successfully.',
      data,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    const data = await this.patientService.findOne(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Patient retrieved successfully.',
      data,
    });

  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto,@Req() req: Request, @Res() res: Response) {
    const data = await this.patientService.update(id, updatePatientDto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Patient updated successfully.',
      data,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string,@Req() req: Request, @Res() res: Response) {
    const data =await this.patientService.remove(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Patient deleted successfully.',
      data,
    });
  }
}
