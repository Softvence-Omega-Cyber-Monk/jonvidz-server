import { PartialType } from '@nestjs/swagger';
import { CreateAssignMedicationDto } from './create-assign-medication.dto';

export class UpdateAssignMedicationDto extends PartialType(CreateAssignMedicationDto) {}
