import { Test, TestingModule } from '@nestjs/testing';
import { ListEquipmentService } from './list-equipment.service';

describe('ListEquipmentService', () => {
  let service: ListEquipmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListEquipmentService],
    }).compile();

    service = module.get<ListEquipmentService>(ListEquipmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
