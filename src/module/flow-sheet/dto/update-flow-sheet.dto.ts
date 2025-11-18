import { PartialType } from '@nestjs/swagger';
import { CreateFlowSheetDto } from './create-flow-sheet.dto';

export class UpdateFlowSheetDto extends PartialType(CreateFlowSheetDto) {}
