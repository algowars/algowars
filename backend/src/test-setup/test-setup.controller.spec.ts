import { Test, TestingModule } from '@nestjs/testing';
import { TestSetupController } from './test-setup.controller';
import { TestSetupService } from './test-setup.service';

describe('TestSetupController', () => {
  let controller: TestSetupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestSetupController],
      providers: [TestSetupService],
    }).compile();

    controller = module.get<TestSetupController>(TestSetupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
