import { Test, TestingModule } from '@nestjs/testing';
import { ProblemSetupController } from './problem-setup.controller';
import { ProblemSetupService } from './problem-setup.service';

describe('ProblemSetupController', () => {
  let controller: ProblemSetupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProblemSetupController],
      providers: [ProblemSetupService],
    }).compile();

    controller = module.get<ProblemSetupController>(ProblemSetupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
