import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateEvaluationAnonymousCommand } from './create-evaluation-anonymous.command';
import { EvaluationService } from 'src/evaluation/services/evaluation.service';
import { ProblemEntityRepository } from 'src/problem/db/problem/problem-entity.repository';
import { Judge0SubmissionFactory } from 'src/evaluation/factories/judge0-submission.factory';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

@CommandHandler(CreateEvaluationAnonymousCommand)
export class CreateEvaluationAnonymousHandler
  implements ICommandHandler<CreateEvaluationAnonymousCommand>
{
  constructor(
    private readonly evaluationService: EvaluationService,
    private readonly problemEntityRepository: ProblemEntityRepository,
    private readonly judgeSubmissionFactory: Judge0SubmissionFactory,
  ) {}

  async execute({
    createEvaluationAnonymous,
  }: CreateEvaluationAnonymousCommand): Promise<{ token: string }[]> {
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

    return tokens;
  }
}
