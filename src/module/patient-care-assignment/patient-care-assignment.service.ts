import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientCareAssignmentDto } from './dto/create-patient-care-assignment.dto';
import { UpdatePatientCareAssignmentDto } from './dto/update-patient-care-assignment.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { safeUserSelect } from "../user/dto/safeUserSelect";

@Injectable()
export class PatientCareAssignmentService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new assignment
  async create(dto: CreatePatientCareAssignmentDto) {
    //console.log("dto------------->",dto);
    const patient = await this.prisma.patient.findUnique({
      where: { id: dto.patientId },
    });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${dto.patientId} not found`);
    }

    // 2. Check if staff exists
    const staff = await this.prisma.staff.findUnique({
      where: { id: dto.staffId },
    });
    if (!staff) {
      throw new NotFoundException(`Staff with ID ${dto.staffId} not found`);
    }
    // const flowSheet=await this.prisma.flowSheet.create({data:{patientId: dto.patientId}});
    // const offVentMonitoring = await this.prisma.offVentMonitoring.create({data:{
    //     patientId: dto.patientId, flowSheetId:flowSheet.id
    //   }})
    // const measuredData=await this.prisma.measuredData.create({data:{
    //   patientId:dto.patientId, flowSheetId:flowSheet.id
    // }})
    // const alarmParameters=await this.prisma.alarmsParameters.create({data:{
    //     patientId: dto.patientId, flowSheetId:flowSheet.id
    //   }})
    // const ventSetting=await this.prisma.ventSetting.create({data:{
    //     patientId: dto.patientId, flowSheetId:flowSheet.id
    //   }})
    // const vitalParameters= await this.prisma.vitalParameters.create({data:{
    //     patientId: dto.patientId, flowSheetId:flowSheet.id
    //   }})

    const assignment = await this.prisma.patientCareAssignment.create({
      data: {
        patientId: dto.patientId,
        staffId: dto.staffId,
        shiftDuration: dto.shiftDuration,
        notes: dto.notes,
      },
      include: {
        patient: true, // return patient details
        staff: true,   // return staff details
      },
    });
    const result = await this.prisma.$transaction(async (tx) => {
      // 1) create parent FlowSheet
      const flowSheet = await tx.flowSheet.create({
        data: {
          patientId: dto.patientId,
          //userId: dto.userId ?? undefined,
          //comments: dto.comments ?? undefined,
          //signature: dto.signature ?? undefined,
        },
      });

      // 2) create minimal child rows, each referencing the parent's id
      // We use tx.[model].create so everything runs inside the same DB transaction
      const offVentMonitoring = await tx.offVentMonitoring.create({
        data: {
          patientId: dto.patientId,
          flowSheetId: flowSheet.id,
          // leave optional fields null/undefined (placeholders)
        },
      });

      const measuredData = await tx.measuredData.create({
        data: {
          patientId: dto.patientId,
          flowSheetId: flowSheet.id,
        },
      });

      const alarmParameters = await tx.alarmsParameters.create({
        data: {
          patientId: dto.patientId,
          flowSheetId: flowSheet.id,
        },
      });

      const ventSetting = await tx.ventSetting.create({
        data: {
          patientId: dto.patientId,
          flowSheetId: flowSheet.id,
        },
      });

      const vitalParameters = await tx.vitalParameters.create({
        data: {
          patientId: dto.patientId,
          flowSheetId: flowSheet.id,
        },
      });

      // 3) Fetch and return the full FlowSheet including the child records
      const full = await tx.flowSheet.findUnique({
        where: { id: flowSheet.id },
        include: {
          off_vent_monitoring: true,
          measured_data: true,
          alarms_parameters: true,
          vent_setting: true,
          vital_parameters: true,
        },
      });

      // Optionally you can add debug logging
      // this.logger.debug(`Created FlowSheet ${flowSheet.id} and placeholder children`);

      return full;
    }); // end transaction

    //return result;

      await this.prisma.mAR.create({data:{patientId: dto.patientId}})
      //await this.prisma.suctionLog.create({data:{patientId: dto.patientId}})
    return assignment;
  }

  // Get all assignments
  async findAll() {
    return this.prisma.patientCareAssignment.findMany({
      include: {
        patient: { include: { user: { select: safeUserSelect } } },
        staff: { include: { user: { select: safeUserSelect } } },
      },
    });
  }

  // Get a single assignment by ID
  async findOne(id: string) {
    const assignment = await this.prisma.patientCareAssignment.findUnique({
      where: { id },
      include: { patient: {include: {
            user: { select: safeUserSelect }
          },}, staff: {include: {
            user: { select: safeUserSelect }
          },} },
    });
    if (!assignment) throw new NotFoundException(`Assignment with id ${id} not found`);
    return assignment;
  }

  // Update an assignment
  async update(id: string, dto: UpdatePatientCareAssignmentDto) {
    // 1. Find existing assignment
    const assignment = await this.prisma.patientCareAssignment.findUnique({
      where: { id },
    });
    if (!assignment) throw new NotFoundException(`Assignment with id ${id} not found`);

    // 2. Optional: Validate new patient or staff IDs if provided
    if (dto.patientId) {
      const patientExists = await this.prisma.patient.findUnique({ where: { id: dto.patientId } });
      if (!patientExists) throw new NotFoundException(`Patient with id ${dto.patientId} not found`);
    }
    if (dto.staffId) {
      const staffExists = await this.prisma.staff.findUnique({ where: { id: dto.staffId } });
      if (!staffExists) throw new NotFoundException(`Staff with id ${dto.staffId} not found`);
    }

    // 3. Build dynamic update object
    const dataToUpdate: UpdatePatientCareAssignmentDto = {};
    if(dto.notes){
      dataToUpdate.notes = dto.notes;
    }
    if(dto.shiftDuration){
      dataToUpdate.shiftDuration = dto.shiftDuration;
    }

    return this.prisma.patientCareAssignment.update({
      where: { id },
      data: dataToUpdate,
    });
  }


  // Delete an assignment
  async remove(id: string) {
    const assignment = await this.prisma.patientCareAssignment.findUnique({ where: { id } });
    if (!assignment) throw new NotFoundException(`Assignment with id ${id} not found`);

    return this.prisma.patientCareAssignment.delete({ where: { id } });
  }
}
