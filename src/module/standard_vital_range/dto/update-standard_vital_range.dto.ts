import { PartialType } from '@nestjs/mapped-types';
import { CreateStandardVitalRangeDto } from './create-standard_vital_range.dto';


// Inherits from CreateStandardVitalRangeDto and makes all properties optional
export class UpdateStandardVitalRangeDto extends PartialType(CreateStandardVitalRangeDto) {}