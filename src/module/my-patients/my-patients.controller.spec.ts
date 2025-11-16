import { Test, TestingModule } from '@nestjs/testing';
import { MyPatientsController } from './my-patients.controller';
import { MyPatientsService } from './my-patients.service';

describe('MyPatientsController', () => {
  let controller: MyPatientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyPatientsController],
      providers: [MyPatientsService],
    }).compile();

    controller = module.get<MyPatientsController>(MyPatientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
