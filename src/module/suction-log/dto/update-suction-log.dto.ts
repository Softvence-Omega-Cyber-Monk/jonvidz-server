import { PartialType } from '@nestjs/swagger';
import { CreateSuctionLogDto } from './create-suction-log.dto';

export class UpdateSuctionLogDto extends PartialType(CreateSuctionLogDto) {}
