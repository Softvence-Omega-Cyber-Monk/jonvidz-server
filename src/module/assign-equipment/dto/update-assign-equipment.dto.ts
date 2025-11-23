import { PartialType } from '@nestjs/swagger';
import { CreateAssignEquipmentDto } from './create-assign-equipment.dto';

export class UpdateAssignEquipmentDto extends PartialType(CreateAssignEquipmentDto) {}



