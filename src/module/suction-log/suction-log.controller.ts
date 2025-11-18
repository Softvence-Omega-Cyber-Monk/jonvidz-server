import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuctionLogService } from './suction-log.service';
import { CreateSuctionLogDto } from './dto/create-suction-log.dto';
import { UpdateSuctionLogDto } from './dto/update-suction-log.dto';

@Controller('suction-log')
export class SuctionLogController {
  constructor(private readonly suctionLogService: SuctionLogService) {}

  @Post()
  create(@Body() createSuctionLogDto: CreateSuctionLogDto) {
    return this.suctionLogService.create(createSuctionLogDto);
  }

  @Get()
  findAll() {
    return this.suctionLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suctionLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSuctionLogDto: UpdateSuctionLogDto) {
    return this.suctionLogService.update(+id, updateSuctionLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suctionLogService.remove(+id);
  }
}
