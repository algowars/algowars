import { Test, TestingModule } from '@nestjs/testing';
import { TestSetupService } from './test-setup.service';

describe('TestSetupService', () => {
  let service: TestSetupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestSetupService],
    }).compile();

    service = module.get<TestSetupService>(TestSetupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
