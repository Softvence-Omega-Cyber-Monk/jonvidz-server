import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/guards/roles.decorator';
import { UserRole } from '@prisma/client';
import { RequestWithUser } from './dto/request-with-user.interface';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR,UserRole.ADMIN)
  @Get()
  findAll(@Req() req: RequestWithUser) {
    console.log("userID--->",req.user)
    return this.userService.findAll();
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }
}
