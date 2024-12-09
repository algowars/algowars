import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProblemCreatedEvent } from 'src/problem/domain/events/problem-created-event';
import { ProblemInjectionToken } from '../injection-token';
import { ProblemRepository } from 'src/problem/domain/problem-repository';
import { Transactional } from 'lib/transactional';
import { SubmissionStatus } from 'src/submission/domain/submission-status';
import { SubmissionInjectionToken } from 'src/submission/application/injection-token';
import { SubmissionRepository } from 'src/submission/domain/submission-repository';
import { Id, IdImplementation } from 'src/common/domain/id';
import { Submission } from 'src/submission/domain/submission';
import { ProblemStatus } from 'src/problem/domain/problem-status';

@EventsHandler(ProblemCreatedEvent)
export class ProblemCreatedEventHandler
  implements IEventHandler<ProblemCreatedEvent>
{
  private readonly logger = new Logger(ProblemCreatedEventHandler.name);

  @Inject(ProblemInjectionToken.PROBLEM_REPOSITORY)
  private readonly problemRepository: ProblemRepository;

  @Inject(SubmissionInjectionToken.SUBMISSION_REPOSITORY)
  private readonly submissionRepository: SubmissionRepository;

  @Transactional()
  async handle(event: ProblemCreatedEvent): Promise<void> {
    const foundProblem = await this.problemRepository.findById(event.problemId);

    if (!foundProblem.getSetups()) {
      throw new InternalServerErrorException(
        'Setup cannot be found from problem',
      );
    }

    if (!foundProblem.getSetups()[0].getSolution()) {
      throw new InternalServerErrorException(
        'Solution is not included on setup',
      );
    }

    const maxRetries = 5;
    const retryDelay = 10_000;

    const submission = await this.pollSubmissionStatus(
      foundProblem.getSetups()[0].getSolution().getId(),
      maxRetries,
      retryDelay,
    );

    const finalStatus = submission?.getAggregateStatus();

    if (finalStatus) {
      if (finalStatus === SubmissionStatus.ACCEPTED) {
        foundProblem.setStatus(ProblemStatus.ACCEPTED);
      } else {
        foundProblem.setStatus(ProblemStatus.REJECTED);
      }

      await this.problemRepository.save(foundProblem);
    }
  }

  private async pollSubmissionStatus(
    submissionId: Id,
    maxRetries: number,
    retryDelay: number,
  ): Promise<Submission> {
    let attempts = 0;

    while (attempts < maxRetries) {
      attempts++;

      const submission = await this.submissionRepository.findById(submissionId);

      if (
        !submission ||
        !submission.getSubmissionResults() ||
        submission.getSubmissionResults().length === 0
      ) {
        this.logger.error(
          `Submission ${submissionId} not found or results are empty. Attempt ${attempts} of ${maxRetries}.`,
        );
        await this.delay(retryDelay);
        continue;
      }

      const statuses = submission
        .getSubmissionResults()
        .map((result) => result.getStatus());

      const allFinal = statuses.every(
        (status) =>
          status !== SubmissionStatus.POLLING &&
          status !== SubmissionStatus.IN_QUEUE &&
          status !== SubmissionStatus.PROCESSING,
      );

      if (allFinal) {
        this.logger.log(`Submission ${submissionId} has final statuses.`);
        submission;
      }

      await this.delay(retryDelay);
    }

    this.logger.error(
      `Max retries reached for submission ${submissionId}. Submission did not reach a final status.`,
    );
    return null;
  }

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
