import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { SystemDefaultService } from './system-default.service';
//import { CreateSystemDefaultDto } from './dto/create-system-default.dto';
import { UpdateSystemDefaultDto } from './dto/update-system-default.dto';

// Implement Here System-Config and System-log
@Controller('system-default')
export class SystemDefaultController {
  constructor(private readonly systemDefaultService: SystemDefaultService) {}

  // @Post()
  // create(@Body() createSystemDefaultDto: CreateSystemDefaultDto) {
  //   return this.systemDefaultService.create(createSystemDefaultDto);
  // }

  @Get()
  findAll() {
    return this.systemDefaultService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.systemDefaultService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSystemDefaultDto: UpdateSystemDefaultDto) {
    return this.systemDefaultService.update(id, updateSystemDefaultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.systemDefaultService.remove(id);
  }
}
