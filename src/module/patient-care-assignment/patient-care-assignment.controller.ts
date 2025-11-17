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
import { PatientCareAssignmentService } from './patient-care-assignment.service';
import { CreatePatientCareAssignmentDto } from './dto/create-patient-care-assignment.dto';
import { UpdatePatientCareAssignmentDto } from './dto/update-patient-care-assignment.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';


@ApiTags('Patient Care Assignments')
@Controller('patient-care-assignments')
export class PatientCareAssignmentController {
  constructor(private readonly service: PatientCareAssignmentService) {}

  @Post()
  async create(@Body() dto: CreatePatientCareAssignmentDto,@Res() res: Response) {
    //console.log("controller dto---->",dto);
    const data=await this.service.create(dto);
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'patient care assignment created successfully.',
      data,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all patient care assignments' })
  @ApiResponse({ status: 200, description: 'List of all assignments.' })
  async findAll(@Res() res: Response) {
    const data = await this.service.findAll();
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'patient care assignment retrieve successfully.',
      data,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific patient care assignment by ID' })
  @ApiResponse({ status: 200, description: 'Assignment details.' })
  async findOne(@Param('id') id: string,@Res() res: Response) {
    const data= await this.service.findOne(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'patient care assignment retrieve successfully.',
      data,
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a patient care assignment' })
  @ApiResponse({ status: 200, description: 'Assignment updated successfully.' })
  async update(@Param('id') id: string, @Body() dto: UpdatePatientCareAssignmentDto,@Res() res: Response) {
    const data = await this.service.update(id, dto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'patient care assignment updated successfully.',
      data,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a patient care assignment' })
  @ApiResponse({ status: 200, description: 'Assignment removed successfully.' })
  async remove(@Param('id') id: string, @Res() res: Response) {
    const data = await this.service.remove(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'patient care assignment deleted successfully.',
      data,
    });
  }
}
