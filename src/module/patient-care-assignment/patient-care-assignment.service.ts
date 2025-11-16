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
