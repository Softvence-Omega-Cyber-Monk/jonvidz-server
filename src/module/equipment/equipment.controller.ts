import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Req, Res } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import sendResponse from 'utils/sendResponse';

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new equipment record' })
  @ApiResponse({ status: 201, description: 'Equipment successfully created.' })
  @ApiBody({ type: CreateEquipmentDto })
  async create(@Body() dto: CreateEquipmentDto,
    @Req() req: Request,
    @Res() res: Response,) {
    const data = await this.equipmentService.create(dto);
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Equipment created successfully.',
      data,
    });

  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all equipment' })
  @ApiResponse({ status: 200, description: 'List of all equipment.' })
  async findAll(@Req() req: Request,
    @Res() res: Response) {
    const data = await this.equipmentService.findAll();
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'equipment Retrieve successfully.',
      data,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve equipment by ID' })
  @ApiResponse({ status: 200, description: 'The requested equipment.' })
  @ApiResponse({ status: 404, description: 'Equipment not found.' })
  async findOne(@Param('id') id: string, @Req() req: Request,
    @Res() res: Response) {
    // Pass the string UUID directly to the service
    const data = await this.equipmentService.findOne(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'equipment Retrieve successfully.',
      data,
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing equipment record' })
  @ApiResponse({ status: 200, description: 'Equipment successfully updated.' })
  @ApiResponse({ status: 404, description: 'Equipment not found.' })
  async update(@Param('id') id: string, @Body() updateEquipmentDto: UpdateEquipmentDto, @Req() req: Request,
    @Res() res: Response,) {
    const data = await this.equipmentService.update(id, updateEquipmentDto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Equipment Update successfully.',
      data,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete equipment by ID' })
  @ApiResponse({ status: 204, description: 'Equipment successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Equipment not found.' })
  async remove(@Param('id') id: string, @Req() req: Request,
    @Res() res: Response,) {
    const data = await this.equipmentService.remove(id);
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Equipment Delete successfully.',
      data,
    });
  }
}