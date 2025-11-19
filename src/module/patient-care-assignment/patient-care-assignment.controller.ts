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
  UseGuards,
} from '@nestjs/common';
import { PatientCareAssignmentService } from './patient-care-assignment.service';
import { CreatePatientCareAssignmentDto } from './dto/create-patient-care-assignment.dto';
import { UpdatePatientCareAssignmentDto } from './dto/update-patient-care-assignment.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/guards/roles.decorator';
import { UserRole } from '@prisma/client';


@ApiTags('Patient Care Assignments')
@Controller('patient-care-assignments')
export class PatientCareAssignmentController {
  constructor(private readonly service: PatientCareAssignmentService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR,UserRole.ADMIN,UserRole.NURSE,UserRole.RECEPTIONIST,UserRole.MODERATOR)
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR,UserRole.ADMIN,UserRole.NURSE,UserRole.RECEPTIONIST,UserRole.MODERATOR)
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

  @ApiOperation({ summary: 'Get all active patient care assignments' })
  @Get('active-assignments')
  async activeAssignments(@Res() res: Response){
    const data = await this.service.activeAssignments();
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Active Patient Care Assignment Retrieve Successfully.',
      data,
    });
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR,UserRole.ADMIN,UserRole.NURSE,UserRole.RECEPTIONIST,UserRole.MODERATOR)
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR,UserRole.ADMIN,UserRole.NURSE,UserRole.RECEPTIONIST,UserRole.MODERATOR)
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR,UserRole.ADMIN,UserRole.NURSE,UserRole.RECEPTIONIST,UserRole.MODERATOR)
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
