import { Module } from '@nestjs/common';
import { SystemDefaultService } from './system-default.service';
import { SystemDefaultController } from './system-default.controller';

@Module({
  controllers: [SystemDefaultController],
  providers: [SystemDefaultService],
})
export class SystemDefaultModule {}
