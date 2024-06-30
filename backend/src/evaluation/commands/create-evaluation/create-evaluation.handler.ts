import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateEvaluationCommand } from './create-evaluation.command';
import { AccountEntityRepository } from 'src/account/db/account-entity.repository';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Judge0SubmissionFactory } from 'src/evaluation/factories/judge0-submission.factory';
import { EvaluationService } from 'src/evaluation/services/evaluation.service';
import { ProblemEntityRepository } from 'src/problem/db/problem/problem-entity.repository';
import { SubmissionResultTestcaseFactory } from 'src/submission-result/factories/submission-result-testcase/submission-result-testcase.factory';
import { SubmissionResultFactory } from 'src/submission-result/factories/submission-result.factory';

@CommandHandler(CreateEvaluationCommand)
export class CreateEvaluationHandler
  implements ICommandHandler<CreateEvaluationCommand>
{
  constructor(
    private readonly evaluationService: EvaluationService,
    private readonly problemEntityRepository: ProblemEntityRepository,
    private readonly accountEntityRepository: AccountEntityRepository,
    private readonly judgeSubmissionFactory: Judge0SubmissionFactory,
    private readonly submissionResultFactory: SubmissionResultFactory,
    private readonly submissionResultTestcaseFactory: SubmissionResultTestcaseFactory,
  ) {}

  async execute({
    createEvaluation,
    sub,
  }: CreateEvaluationCommand): Promise<any> {
    const account = await this.accountEntityRepository.findBySub(sub);

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const problem = await this.problemEntityRepository.findBySlugWithRelations(
      createEvaluation.problemSlug,
    );

    if (!problem.getSetups() || !problem.getTests()) {
      throw new InternalServerErrorException(
        'Problem is not properly configured',
      );
    }

    const problemSetup = problem
      .getSetups()
      .find((setup) => setup.getLanguageId() === createEvaluation.languageId);

    if (!problemSetup) {
      throw new NotFoundException(
        'This language is not available for this problem',
      );
    }

    const tokens = await this.evaluationService.createSubmission(
      this.judgeSubmissionFactory.create(
        problemSetup,
        problem.getTests(),
        createEvaluation.sourceCode,
        createEvaluation.languageId,
      ),
    );

    if (!tokens) {
      throw new InternalServerErrorException('Error creating submission');
    }

    const testcases = await Promise.all(
      tokens.map(({ token }, index) =>
        this.submissionResultTestcaseFactory.create({
          token,
          order: index,
          isRandomTestcase: false,
        }),
      ),
    );

    const result = await this.submissionResultFactory.create({
      languageId: createEvaluation.languageId,
      isSubmission: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: account,
      testcases: testcases,
    });

    return result.getId();
  }
}
