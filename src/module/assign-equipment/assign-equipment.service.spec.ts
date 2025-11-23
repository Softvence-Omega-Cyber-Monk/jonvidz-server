import { Test, TestingModule } from '@nestjs/testing';
import { AssignEquipmentService } from './assign-equipment.service';

describe('AssignEquipmentService', () => {
  let service: AssignEquipmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignEquipmentService],
    }).compile();

    service = module.get<AssignEquipmentService>(AssignEquipmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
