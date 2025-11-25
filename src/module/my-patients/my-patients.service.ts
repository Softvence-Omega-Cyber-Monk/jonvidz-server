import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateMyPatientDto } from './dto/update-my-patient.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtUser } from '../../common/request-with-user.interface';

@Injectable()
export class MyPatientsService {
  constructor(private prisma: PrismaService) {}
  // create(createMyPatientDto: CreateMyPatientDto) {
  //   return 'This action adds a new myPatient';
  // }

  async findAll(payload:JwtUser) {
    const myStaffID=await this.prisma.staff.findUnique({where:{userId:payload.id}});
    //console.log("myStaffID------->",myStaffID);
    if(!myStaffID){
      return ;
    }
    const data = await this.prisma.patientCareAssignment.findMany({
      where: { staffId: myStaffID.id,status:"ACTIVE" },
      include: { patient: true },
      orderBy: { createdAt: 'desc' },
    });
    //console.log('payload', payload);
    return data;
  }

  async findOne(id: string) {
    // 1. Find existing assignment
    const assignment = await this.prisma.patientCareAssignment.findUnique({
      where: { id },
    });
    if (!assignment) throw new NotFoundException(`Assignment with id ${id} not found`);
    const data = await this.prisma.patientCareAssignment.findUnique({where:{id}});
    return data;
  }

  async update(id: string, updateMyPatientDto: UpdateMyPatientDto) {
    // 1. Find existing assignment
    const assignment = await this.prisma.patientCareAssignment.findUnique({
      where: { id },
    });
    if (!assignment) throw new NotFoundException(`Assignment with id ${id} not found`);
    const data = await this.prisma.patientCareAssignment.update({
      where: { id },
      data: updateMyPatientDto,
    })
    return data;
  }

  async remove(id: string) {
    // 1. Find existing assignment
    const assignment = await this.prisma.patientCareAssignment.findUnique({
      where: { id },
    });
    if (!assignment) throw new NotFoundException(`Assignment with id ${id} not found`);
    const data = await this.prisma.patientCareAssignment.delete({where:{id:id}});
    return data;
  }
}
