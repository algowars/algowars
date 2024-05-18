import { Test, TestingModule } from '@nestjs/testing';
import { EvaluatorController } from './evaluator.controller';
import { EvaluatorService } from './evaluator.service';
import { EvaluatorMock } from './mocks/evaluator.mock';
import { AuthMock } from 'src/auth/mocks/auth.mock';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { AccountOwnerGuard } from 'src/auth/account-owner.guard';
import { ProblemService } from 'src/problem/problem.service';
import { ProblemMock } from 'src/problem/mocks/problem.mock';
import { ProblemSetupService } from 'src/problem-setup/problem-setup.service';
import { ProblemSetupMock } from 'src/problem-setup/mocks/problem-setup.mock';
import { SubmissionService } from 'src/submission/submission.service';
import { SubmissionMock } from 'src/submission/mocks/submission.mock';

describe('EvaluatorController', () => {
  let controller: EvaluatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvaluatorController],
      providers: [
        {
          provide: EvaluatorService,
          useValue: EvaluatorMock.mockEvaluatorService([]),
        },
        {
          provide: ProblemService,
          useValue: ProblemMock.mockProblemService([]),
        },
        {
          provide: ProblemSetupService,
          useValue: ProblemSetupMock.mockProblemSetupService([]),
        },
        {
          provide: SubmissionService,
          useValue: SubmissionMock.mockSubmissionService(),
        },
      ],
    })
      .overrideGuard(AuthorizationGuard)
      .useValue(AuthMock.mockAuthorizationGuard())
      .overrideGuard(AccountOwnerGuard)
      .useValue(AuthMock.mockAccountOwnerGuard())
      .compile();

    controller = module.get<EvaluatorController>(EvaluatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
