import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarService } from './mar.service';
import { CreateMarDto } from './dto/create-mar.dto';
import { UpdateMarDto } from './dto/update-mar.dto';

@Controller('mar')
export class MarController {
  constructor(private readonly marService: MarService) {}

  @Post()
  create(@Body() createMarDto: CreateMarDto) {
    return this.marService.create(createMarDto);
  }

  @Get()
  findAll() {
    return this.marService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarDto: UpdateMarDto) {
    return this.marService.update(+id, updateMarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marService.remove(+id);
  }
}
