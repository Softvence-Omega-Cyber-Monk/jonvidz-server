import { Injectable } from '@nestjs/common';
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
      where: { staffId: myStaffID.id },
      include: { patient: true },
      orderBy: { createdAt: 'desc' },
    });
    //console.log('payload', payload);
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} myPatient`;
  }

  update(id: number, updateMyPatientDto: UpdateMyPatientDto) {
    return `This action updates a #${id} myPatient`;
  }

  remove(id: number) {
    return `This action removes a #${id} myPatient`;
  }
}
