import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateEvaluationAnonymousCommand } from './create-evaluation-anonymous.command';
import { EvaluationService } from 'src/evaluation/services/evaluation.service';
import { ProblemEntityRepository } from 'src/problem/db/problem/problem-entity.repository';
import { Judge0SubmissionFactory } from 'src/evaluation/factories/judge0-submission.factory';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SubmissionResultFactory } from 'src/submission-result/factories/submission-result.factory';
import { SubmissionResultTestcaseFactory } from 'src/submission-result/factories/submission-result-testcase/submission-result-testcase.factory';
import { AccountEntityRepository } from 'src/account/db/account-entity.repository';

@CommandHandler(CreateEvaluationAnonymousCommand)
export class CreateEvaluationAnonymousHandler
  implements ICommandHandler<CreateEvaluationAnonymousCommand>
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
    createEvaluationAnonymous,
    sub,
  }: CreateEvaluationAnonymousCommand): Promise<string> {
    const account = await this.accountEntityRepository.findBySub(sub);

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const problem = await this.problemEntityRepository.findBySlugWithRelations(
      createEvaluationAnonymous.problemSlug,
    );

    if (!problem.getSetups() || !problem.getTests()) {
      throw new InternalServerErrorException(
        'Problem is not properly configured',
      );
    }

    const problemSetup = problem
      .getSetups()
      .find(
        (setup) =>
          setup.getLanguageId() === createEvaluationAnonymous.languageId,
      );

    if (!problemSetup) {
      throw new NotFoundException(
        'This language is not available for this problem',
      );
    }

    const tokens = await this.evaluationService.createSubmission(
      this.judgeSubmissionFactory.create(
        problemSetup,
        problem.getTests(),
        createEvaluationAnonymous.sourceCode,
        createEvaluationAnonymous.languageId,
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
      languageId: createEvaluationAnonymous.languageId,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: account,
      testcases: testcases,
    });

    return result.getId();
  }
}
