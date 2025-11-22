import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterPatientDto, RegisterStaffDto } from './dto/create-auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './guards/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // A. Staff and Doctor Registration
  // Note: An Admin Guard should typically be applied here to ensure only an authorized Admin can create staff accounts.
  //@UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles(UserRole.DOCTOR,UserRole.ADMIN)
  @Post('register/staff')
  async registerStaff(@Body() dto: RegisterStaffDto) {

    return this.authService.registerStaff(dto);
  }

  // B. Patient Registration
  // This endpoint can be used for public registration or staff-initiated patient registration.
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR,UserRole.ADMIN,UserRole.NURSE,UserRole.RECEPTIONIST,UserRole.MODERATOR)
  @Post('register/patient')
  async registerPatient(@Body() dto: RegisterPatientDto) {
    return this.authService.registerPatient(dto);
  }

  //  login
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
