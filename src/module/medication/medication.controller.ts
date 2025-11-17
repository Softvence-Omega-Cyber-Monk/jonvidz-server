import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { MedicationService } from './medication.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import sendResponse from 'src/utils/sendResponse';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/guards/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('medication')
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR,UserRole.ADMIN,UserRole.NURSE,UserRole.RECEPTIONIST,UserRole.MODERATOR)
  @Post()
  @ApiOperation({ summary: 'Create a new medication' })
  @ApiResponse({ status: 201, description: 'Medication successfully created.' })
  @ApiBody({ type: CreateMedicationDto })
  async create(@Body() createMedicationDto: CreateMedicationDto, @Req() req: Request,
    @Res() res: Response) {
    const data = await this.medicationService.create(createMedicationDto);
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'medication created successfully.',
      data,
    });
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR,UserRole.ADMIN,UserRole.NURSE,UserRole.RECEPTIONIST,UserRole.MODERATOR)
  @Get()
  @ApiOperation({ summary: 'Retrieve all medications' })
  @ApiResponse({ status: 200, description: 'List of all medications.' })
  async findAll(
    @Req() req: Request,
    @Res() res: Response,) {
    const data = await this.medicationService.findAll();
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'medication Retrieve all successfully.',
      data,
    });
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR,UserRole.ADMIN,UserRole.NURSE,UserRole.RECEPTIONIST,UserRole.MODERATOR)
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a medication by ID' })
  @ApiResponse({ status: 200, description: 'The requested medication.' })
  @ApiResponse({ status: 404, description: 'Medication not found.' })
  async findOne(@Param('id') id: string, @Req() req: Request,
    @Res() res: Response,) {
    // Note: The service now handles the string ID (UUID)
    const data = await this.medicationService.findOne(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'medication Retrieve successfully.',
      data,
    });
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR,UserRole.ADMIN,UserRole.NURSE,UserRole.RECEPTIONIST,UserRole.MODERATOR)
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing medication' })
  @ApiResponse({ status: 200, description: 'Medication successfully updated.', })
  @ApiResponse({ status: 404, description: 'Medication not found.' })
  async update(@Param('id') id: string, @Body() updateMedicationDto: UpdateMedicationDto, @Req() req: Request,
    @Res() res: Response,) {
    const data = await this.medicationService.update(id, updateMedicationDto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'medication Update successfully.',
      data,
    });
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR,UserRole.ADMIN,UserRole.NURSE,UserRole.RECEPTIONIST,UserRole.MODERATOR)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Use 204 for successful deletion
  @ApiOperation({ summary: 'Delete a medication by ID' })
  @ApiResponse({ status: 204, description: 'Medication successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Medication not found.' })
  async remove(@Param('id') id: string, req: Request,
    @Res() res: Response) {
    const data = await this.medicationService.remove(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'medication delete successfully.',
      data,
    });
  }
}
