import { PartialType } from '@nestjs/swagger';
import { CreateMeasuredDatumDto } from './create-measured-datum.dto';

export class UpdateMeasuredDatumDto extends PartialType(CreateMeasuredDatumDto) {}
