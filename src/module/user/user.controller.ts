import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  Res,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/guards/roles.decorator';
import { UserRole } from '@prisma/client';
import { RequestWithUser } from './dto/request-with-user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
//import { CreateUserDto } from './dto/create-user.dto';
import { Request, Response } from 'express';
import sendResponse from '../../../utils/sendResponse';
import { ApiOperation } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // @Post()
  // create(@Body() dto: CreateUserDto) {
  //   return this.userService.create(dto);
  // }
  @ApiOperation({ summary: 'Get all Users' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR,UserRole.ADMIN)
  @Get()
  async findAll(@Req() req: RequestWithUser,@Res() res: Response) {
    //console.log("userID--->",req.user)
    const data= await this.userService.findAll();
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Users retrieve successfully.',
      data,
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto, @Res() res: Response) {
    const data = await this.userService.update(id, dto);
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'User updated successfully.',
      data,
    });
  }
}
