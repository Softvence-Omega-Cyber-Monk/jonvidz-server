import { Test, TestingModule } from '@nestjs/testing';
import { MyPatientsService } from './my-patients.service';

describe('MyPatientsService', () => {
  let service: MyPatientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyPatientsService],
    }).compile();

    service = module.get<MyPatientsService>(MyPatientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
