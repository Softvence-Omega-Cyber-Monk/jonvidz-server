import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { MyPatientsService } from './my-patients.service';
import { UpdateMyPatientDto } from './dto/update-my-patient.dto';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/guards/roles.decorator';
import { UserRole } from '@prisma/client';
import { RequestWithUser } from '../user/dto/request-with-user.interface';
import { Response } from 'express';
import sendResponse from '../../../utils/sendResponse';

@Controller('my-patients')
export class MyPatientsController {
  constructor(private readonly myPatientsService: MyPatientsService) {}


  // @Post()
  // create(@Body() createMyPatientDto: CreateMyPatientDto) {
  //   return this.myPatientsService.create(createMyPatientDto);
  // }
  @ApiOperation({ summary: 'Get my patient care assignments' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR,UserRole.ADMIN,UserRole.NURSE)
  @Get()
   async findAll(@Req() req: RequestWithUser,@Res() res: Response) {
    const user = req.user;
    const data = await this.myPatientsService.findAll(user);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'my patient care assignment retrieve successfully.',
      data,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.myPatientsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMyPatientDto: UpdateMyPatientDto) {
    return this.myPatientsService.update(+id, updateMyPatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.myPatientsService.remove(+id);
  }
}
