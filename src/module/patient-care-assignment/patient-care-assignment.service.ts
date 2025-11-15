import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientCareAssignmentDto } from './dto/create-patient-care-assignment.dto';
import { UpdatePatientCareAssignmentDto } from './dto/update-patient-care-assignment.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PatientCareAssignmentService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new assignment
  async create(dto: CreatePatientCareAssignmentDto) {
    console.log("dto------------->",dto);
    return this.prisma.patientCareAssignment.create({
      data: {
        patientId: dto.patientId,
        staffId: dto.staffId,
        shiftDuration: dto.shiftDuration,
        notes: dto.notes,
      },
      include: { patient: true, staff: true },
    });
  }

  // Get all assignments
  async findAll() {
    return this.prisma.patientCareAssignment.findMany({
      include: { patient: true, staff: true },
    });
  }

  // Get a single assignment by ID
  async findOne(id: string) {
    const assignment = await this.prisma.patientCareAssignment.findUnique({
      where: { id },
      include: { patient: true, staff: true },
    });
    if (!assignment) throw new NotFoundException(`Assignment with id ${id} not found`);
    return assignment;
  }

  // Update an assignment
  async update(id: string, dto: UpdatePatientCareAssignmentDto) {
    const assignment = await this.prisma.patientCareAssignment.findUnique({ where: { id } });
    if (!assignment) throw new NotFoundException(`Assignment with id ${id} not found`);

    return this.prisma.patientCareAssignment.update({
      where: { id },
      data: {
        patientId: dto.patientId ?? assignment.patientId,
        staffId: dto.staffId ?? assignment.staffId,
        shiftDuration: dto.shiftDuration ?? assignment.shiftDuration,
        notes: dto.notes ?? assignment.notes,
      },
      include: { patient: true, staff: true },
    });
  }

  // Delete an assignment
  async remove(id: string) {
    const assignment = await this.prisma.patientCareAssignment.findUnique({ where: { id } });
    if (!assignment) throw new NotFoundException(`Assignment with id ${id} not found`);

    return this.prisma.patientCareAssignment.delete({ where: { id } });
  }
}
