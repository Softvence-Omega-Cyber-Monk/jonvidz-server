import { PartialType } from '@nestjs/swagger';
import { CreateSystemDefaultDto } from './create-system-default.dto';

export class UpdateSystemDefaultDto extends PartialType(CreateSystemDefaultDto) {}
// export class UpdateSystemConfigDto {
//   defaultTimezone?: string;
//   retentionDays?: number;
//   chartingPeriod?: string;
// }