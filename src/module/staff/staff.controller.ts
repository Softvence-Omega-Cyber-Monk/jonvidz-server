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
import { StaffService } from './staff.service';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/guards/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  // @Post()
  // create(@Body() createStaffDto: CreateStaffDto) {
  //   return this.staffService.create(createStaffDto);
  // }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR,UserRole.ADMIN,UserRole.NURSE,UserRole.RECEPTIONIST,UserRole.MODERATOR)
  @Get()
  @ApiOperation({ summary: 'Retrieve all Staffs' })
  async findAll(@Req() req: Request, @Res() res: Response) {
    const data = await this.staffService.findAll();
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Staffs retrieved successfully.',
      data
    });
  }
  @Get("active-staff")
  @ApiOperation({ summary: 'Retrieve active Staffs' })
  async activeStaff(@Req() req: Request, @Res() res: Response) {
    const data = await this.staffService.activeStaff();
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Active Staffs retrieved successfully.',
      total:data?.length,
      data:data,
    });
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR,UserRole.ADMIN,UserRole.NURSE,UserRole.RECEPTIONIST,UserRole.MODERATOR)
  @Get(':id')
  async findOne(@Param('id') id: string,@Req() req: Request, @Res() res: Response) {
    const data = await this.staffService.findOne(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Staff retrieved successfully.',
      data,
    });
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR,UserRole.ADMIN,UserRole.NURSE,UserRole.RECEPTIONIST,UserRole.MODERATOR)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto,@Req() req: Request, @Res() res: Response) {
    const data = await this.staffService.update(id, updateStaffDto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Staff updated successfully.',
      data,
    });
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR,UserRole.ADMIN,UserRole.NURSE,UserRole.RECEPTIONIST,UserRole.MODERATOR)
  @Delete(':id')
  async remove(@Param('id') id: string,@Req() req: Request, @Res() res: Response) {
   const data = await this.staffService.remove(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Staff deleted successfully.',
      data,
    });
  }
}
