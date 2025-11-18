import { Test, TestingModule } from '@nestjs/testing';
import { MeasuredDataController } from './measured-data.controller';
import { MeasuredDataService } from './measured-data.service';

describe('MeasuredDataController', () => {
  let controller: MeasuredDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeasuredDataController],
      providers: [MeasuredDataService],
    }).compile();

    controller = module.get<MeasuredDataController>(MeasuredDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
