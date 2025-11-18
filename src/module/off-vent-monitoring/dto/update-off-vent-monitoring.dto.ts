import { PartialType } from '@nestjs/swagger';
import { CreateOffVentMonitoringDto } from './create-off-vent-monitoring.dto';

export class UpdateOffVentMonitoringDto extends PartialType(CreateOffVentMonitoringDto) {}
