import { PartialType } from '@nestjs/swagger';
import { CreateMyPatientDto } from './create-my-patient.dto';

export class UpdateMyPatientDto extends PartialType(CreateMyPatientDto) {}
