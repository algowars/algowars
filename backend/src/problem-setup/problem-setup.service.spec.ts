import { Test, TestingModule } from '@nestjs/testing';
import { ProblemSetupService } from './problem-setup.service';

describe('ProblemSetupService', () => {
  let service: ProblemSetupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProblemSetupService],
    }).compile();

    service = module.get<ProblemSetupService>(ProblemSetupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
