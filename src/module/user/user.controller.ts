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
  Post,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/guards/roles.decorator';
import { UserRole } from '@prisma/client';
import { RequestWithUser } from './dto/request-with-user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateMyProfileDto } from './dto/update-myprofile-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiOperation({ summary: 'Register as a user' })
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
  @ApiOperation({ summary: 'Get all Users' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR,UserRole.ADMIN,UserRole.NURSE,UserRole.RECEPTIONIST,UserRole.MODERATOR)
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
  @ApiOperation({ summary: 'Active staff and Total Patients retrieve successfully' })
  @Get('active-staff-total-user')
  async activeStaffAndTotalUser(@Res() res: Response){
    const data = await this.userService.activeStaffAndTotalUser();
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Active-Staff and Total Patients retrieve successfully.',
      data,
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve User by ID' })
  @ApiResponse({ status: 200, description: 'The requested User.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findOne(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    // Pass the string UUID directly to the service
    const data = await this.userService.findOne(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'User Retrieve successfully.',
      data,
    });
  }
  @ApiOperation({ summary: 'Allows only ADMIN to update a user’s role or status' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
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

  @ApiOperation({ summary: 'update my profile' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('my-profile/:id')
  async myProfile(@Param('id') id: string,@Body() dto: UpdateMyProfileDto,@Req() req: RequestWithUser, @Res() res: Response) {
    //const user = req.user;
    // console.log("userID------------------------------------------->",user)
    // console.log("req.user------------------------------------------->",req.user)
    const data = await this.userService.myProfile(id, dto);
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Profile updated successfully.',
      data,
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const data = await this.userService.remove(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'User deleted successfully.',
      data,
    })
  }
}
