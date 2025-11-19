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
  UseGuards,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/guards/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  // @Post()
  // create(@Body() createPatientDto: CreatePatientDto) {
  //   return this.patientService.create(createPatientDto);
  // }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR,UserRole.ADMIN,UserRole.NURSE,UserRole.RECEPTIONIST,UserRole.MODERATOR)
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
  @Get('total-patients')
  @ApiOperation({ summary: 'Retrieve total patients' })
  async totalPatient(@Req() req: Request, @Res() res: Response) {
    const data = await this.patientService.totalPatient();
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Total Patients retrieved successfully.',
      data:{
        totalPatients: data?.length,
      },
    });
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR,UserRole.ADMIN,UserRole.NURSE,UserRole.RECEPTIONIST,UserRole.MODERATOR,UserRole.PATIENT)
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR,UserRole.ADMIN,UserRole.NURSE,UserRole.RECEPTIONIST,UserRole.MODERATOR)
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR,UserRole.ADMIN,UserRole.NURSE,UserRole.RECEPTIONIST,UserRole.MODERATOR)
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
