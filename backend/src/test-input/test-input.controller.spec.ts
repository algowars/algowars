import { Test, TestingModule } from '@nestjs/testing';
import { TestInputController } from './test-input.controller';
import { TestInputService } from './test-input.service';

describe('TestInputController', () => {
  let controller: TestInputController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestInputController],
      providers: [TestInputService],
    }).compile();

    controller = module.get<TestInputController>(TestInputController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
