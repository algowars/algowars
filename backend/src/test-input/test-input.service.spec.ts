import { Test, TestingModule } from '@nestjs/testing';
import { TestInputService } from './test-input.service';

describe('TestInputService', () => {
  let service: TestInputService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestInputService],
    }).compile();

    service = module.get<TestInputService>(TestInputService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
