import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientCareAssignmentService } from './patient-care-assignment.service';
import { CreatePatientCareAssignmentDto } from './dto/create-patient-care-assignment.dto';
import { UpdatePatientCareAssignmentDto } from './dto/update-patient-care-assignment.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {safeUserSelect} from "../user/dto/safeUserSelect"

@ApiTags('Patient Care Assignments')
@Controller('patient-care-assignments')
export class PatientCareAssignmentController {
  constructor(private readonly service: PatientCareAssignmentService) {}

  @Post()
  create(@Body() dto: CreatePatientCareAssignmentDto) {
    //console.log("controller dto---->",dto);
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all patient care assignments' })
  @ApiResponse({ status: 200, description: 'List of all assignments.' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific patient care assignment by ID' })
  @ApiResponse({ status: 200, description: 'Assignment details.' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a patient care assignment' })
  @ApiResponse({ status: 200, description: 'Assignment updated successfully.' })
  update(@Param('id') id: string, @Body() dto: UpdatePatientCareAssignmentDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a patient care assignment' })
  @ApiResponse({ status: 200, description: 'Assignment removed successfully.' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
