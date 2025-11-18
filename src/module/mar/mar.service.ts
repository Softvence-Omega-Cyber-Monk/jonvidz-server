import { Injectable } from '@nestjs/common';
import { CreateMarDto } from './dto/create-mar.dto';
import { UpdateMarDto } from './dto/update-mar.dto';

@Injectable()
export class MarService {
  create(createMarDto: CreateMarDto) {
    return 'This action adds a new mar';
  }

  findAll() {
    return `This action returns all mar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mar`;
  }

  update(id: number, updateMarDto: UpdateMarDto) {
    return `This action updates a #${id} mar`;
  }

  remove(id: number) {
    return `This action removes a #${id} mar`;
  }
}
