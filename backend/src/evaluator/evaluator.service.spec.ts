import { Test, TestingModule } from '@nestjs/testing';
import { EvaluatorService } from './evaluator.service';

describe('EvaluatorService', () => {
  let service: EvaluatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvaluatorService],
    }).compile();

    service = module.get<EvaluatorService>(EvaluatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
