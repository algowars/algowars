import { Test, TestingModule } from '@nestjs/testing';
import { EvaluatorController } from './evaluator.controller';
import { EvaluatorService } from './evaluator.service';

describe('EvaluatorController', () => {
  let controller: EvaluatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvaluatorController],
      providers: [EvaluatorService],
    }).compile();

    controller = module.get<EvaluatorController>(EvaluatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
