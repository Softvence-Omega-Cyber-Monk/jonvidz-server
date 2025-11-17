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
  Res,
} from '@nestjs/common';
import { AuditLogService } from './audit_log.service';
import { CreateAuditLogDto } from './dto/create-audit_log.dto';
import { UpdateAuditLogDto } from './dto/update-audit_log.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import sendResponse from '../../utils/sendResponse';
import { Request, Response } from 'express';

@Controller('audit-log')
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  // --- POST /audit-log ---
  @Post()
  @ApiOperation({ summary: 'Create a new audit log entry' })
  @ApiResponse({ status: 201, description: 'Audit log successfully created.' })
  @ApiBody({ type: CreateAuditLogDto })
  async create(@Body() createAuditLogDto: CreateAuditLogDto,@Res() res: Response) {
    const data = await this.auditLogService.create(createAuditLogDto);
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Audit log created successfully.',
      data,
    });
  }

  // --- GET /audit-log ---
  @Get()
  @ApiOperation({
    summary: 'Retrieve all audit log entries',
  })
  @ApiResponse({ status: 200, description: 'List of audit logs.' })
  async findAll(@Res() res: Response) {
    const data = await this.auditLogService.findAll();
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Audit logs retrieve successfully.',
      data,
    });
  }

  // --- GET /audit-log/:id ---
  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve a single audit log by ID',
  })
  @ApiResponse({ status: 200, description: 'Audit log found.' })
  @ApiResponse({ status: 404, description: 'Audit log not found.' })
  @ApiParam({
    name: 'id',
    description: 'Audit Log UUID',
    example: 'd318e874-98c4-4d8e-a2f0-7058869151c8',
  })
  async findOne(@Param('id') id: string,@Res() res: Response) {
    const data = await this.auditLogService.findOne(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Audit log retrieve successfully.',
      data,
    });
  }

  // --- PATCH /audit-log/:id ---
  @Patch(':id')
  @ApiOperation({
    summary: 'Update specific fields of an audit log',
  })
  @ApiResponse({ status: 200, description: 'Audit log successfully updated.' })
  @ApiResponse({ status: 404, description: 'Audit log not found.' })
  @ApiParam({ name: 'id', description: 'Audit Log UUID' })
  @ApiBody({ type: UpdateAuditLogDto })
  async update(
    @Param('id') id: string,
    @Body() updateAuditLogDto: UpdateAuditLogDto,
    @Res() res: Response
  ) {
    const data = await this.auditLogService.update(id, updateAuditLogDto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Audit log updated successfully.',
      data,
    });
  }

  // --- DELETE /audit-log/:id ---
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content for successful deletion
  @ApiOperation({ summary: 'Delete an audit log entry' })
  @ApiResponse({ status: 204, description: 'Audit log successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Audit log not found.' })
  @ApiParam({ name: 'id', description: 'Audit Log UUID' })
  async remove(@Param('id',) id: string,@Res() res: Response) {
   const data = await this.auditLogService.remove(id);
  return sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Audit log deleted successfully.',
    data,
  });
  }
}