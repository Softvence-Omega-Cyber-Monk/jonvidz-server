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
import { StaffService } from './staff.service';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Request, Response } from 'express';
import sendResponse from '../../../utils/sendResponse';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  // @Post()
  // create(@Body() createStaffDto: CreateStaffDto) {
  //   return this.staffService.create(createStaffDto);
  // }

  @Get()
  @ApiOperation({ summary: 'Retrieve all Staffs' })
  async findAll(@Req() req: Request, @Res() res: Response) {
    const data = await this.staffService.findAll();
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Staffs retrieved successfully.',
      data,
    });
  }

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
