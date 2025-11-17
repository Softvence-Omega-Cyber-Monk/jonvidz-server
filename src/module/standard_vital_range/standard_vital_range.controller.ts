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
import { StandardVitalRangeService } from './standard_vital_range.service';
import { CreateStandardVitalRangeDto } from './dto/create-standard_vital_range.dto';
import { UpdateStandardVitalRangeDto } from './dto/update-standard_vital_range.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/guards/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('standard-vital-range')
export class StandardVitalRangeController {
  constructor(private readonly standardVitalRangeService: StandardVitalRangeService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR,UserRole.ADMIN,UserRole.NURSE,UserRole.RECEPTIONIST,UserRole.MODERATOR)
  @Post()
  @ApiOperation({ summary: 'Create a new standard vital sign range' })
  @ApiResponse({ status: 201, description: 'Range successfully created.'})
  @ApiBody({ type: CreateStandardVitalRangeDto })
  async create(@Body() createStandardVitalRangeDto: CreateStandardVitalRangeDto,@Req() req: Request,
         @Res() res: Response) {
    const data = await this.standardVitalRangeService.create(createStandardVitalRangeDto);
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'standard created successfully.',
      data,
    });
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR,UserRole.ADMIN,UserRole.NURSE,UserRole.RECEPTIONIST,UserRole.MODERATOR)
  @Get()
  @ApiOperation({ summary: 'Retrieve all standard vital sign ranges' })
  @ApiResponse({ status: 200, description: 'List of all vital sign ranges.'})
  async findAll(@Req() req: Request,
                @Res() res: Response) {
    const data = await this.standardVitalRangeService.findAll();
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Retrieve all standard vital sign ranges successfully.',
      data,
    });
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR,UserRole.ADMIN,UserRole.NURSE,UserRole.RECEPTIONIST,UserRole.MODERATOR)
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a vital sign range by ID' })
  @ApiResponse({ status: 200, description: 'The requested vital sign range.' })
  @ApiResponse({ status: 404, description: 'Range not found.' })
  async findOne(@Param('id') id: string,@Req() req: Request,
                @Res() res: Response) {
    // Pass the string UUID directly to the service
    const data = await this.standardVitalRangeService.findOne(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Retrieve a vital sign range by ID successfully.',
      data,
    });
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR,UserRole.ADMIN,UserRole.NURSE,UserRole.RECEPTIONIST,UserRole.MODERATOR)
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing vital sign range' })
  @ApiResponse({ status: 200, description: 'Range successfully updated.',})
  @ApiResponse({ status: 404, description: 'Range not found.' })
  async update(@Param('id') id: string, @Body() updateStandardVitalRangeDto: UpdateStandardVitalRangeDto,@Req() req: Request,
         @Res() res: Response){
    const data = await this.standardVitalRangeService.update(id, updateStandardVitalRangeDto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Update an existing vital sign range successfully.',
      data,
    });
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR,UserRole.ADMIN,UserRole.NURSE,UserRole.RECEPTIONIST,UserRole.MODERATOR)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a vital sign range by ID' })
  @ApiResponse({ status: 204, description: 'Range successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Range not found.' })
  async remove(@Param('id') id: string,@Req() req: Request,
               @Res() res: Response) {
    const data = await this.standardVitalRangeService.remove(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Delete a vital sign range by ID successfully.',
      data,
    });
  }
}
