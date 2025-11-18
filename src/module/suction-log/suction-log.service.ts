import { Injectable } from '@nestjs/common';
import { CreateSuctionLogDto } from './dto/create-suction-log.dto';
import { UpdateSuctionLogDto } from './dto/update-suction-log.dto';

@Injectable()
export class SuctionLogService {
  create(createSuctionLogDto: CreateSuctionLogDto) {
    return 'This action adds a new suctionLog';
  }

  findAll() {
    return `This action returns all suctionLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} suctionLog`;
  }

  update(id: number, updateSuctionLogDto: UpdateSuctionLogDto) {
    return `This action updates a #${id} suctionLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} suctionLog`;
  }
}
