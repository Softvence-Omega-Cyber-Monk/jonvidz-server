import { Test, TestingModule } from '@nestjs/testing';
import { SystemDefaultController } from './system-default.controller';
import { SystemDefaultService } from './system-default.service';

describe('SystemDefaultController', () => {
  let controller: SystemDefaultController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemDefaultController],
      providers: [SystemDefaultService],
    }).compile();

    controller = module.get<SystemDefaultController>(SystemDefaultController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
