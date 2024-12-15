import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Transactional } from 'lib/transactional';
import { SubmissionCreatedEvent } from 'src/submission/domain/events/submission-created-event';
import { SubmissionRepository } from 'src/submission/domain/submission-repository';
import { IdImplementation } from 'src/common/domain/id';
import { CodeExecutionServiceFactory } from 'lib/code-execution/code-execution-service-factory';
import { CodeExecutionResponse } from 'lib/code-execution/code-execution-service';
import { CodeExecutionEvaluationResultFactory } from 'lib/code-execution/code-execution-evaluation-result-factory';
import { SubmissionInjectionToken } from '../injection-token';

@EventsHandler(SubmissionCreatedEvent)
export class SubmissionCreatedEventHandler
  implements IEventHandler<SubmissionCreatedEvent>
{
  private readonly logger = new Logger(SubmissionCreatedEventHandler.name);

  @Inject(SubmissionInjectionToken.SUBMISSION_REPOSITORY)
  private readonly submissionRepository: SubmissionRepository;

  @Inject()
  private readonly codeExecutionServiceFactory: CodeExecutionServiceFactory;

  @Inject()
  private readonly codeExecutionEvaluationResultFactory: CodeExecutionEvaluationResultFactory;

  @Transactional()
  async handle(event: SubmissionCreatedEvent): Promise<void> {
    const foundSubmission = await this.submissionRepository.findById(
      new IdImplementation(event.submissionId),
    );

    if (!foundSubmission.getLanguage()) {
      throw new InternalServerErrorException(
        'Language cannot be found from submission',
      );
    }

    const maxRetries = 10;
    const retryDelay = 4_000;

    const result = await this.pollForRequest(
      foundSubmission.getSubmissionResults()[0].getToken(),
      maxRetries,
      retryDelay,
    );

    const evaluator = this.codeExecutionEvaluationResultFactory.getEvaluator(
      foundSubmission.getLanguage(),
    );

    const evaluationResult = evaluator.evaluate(result);

    const submissionResult = foundSubmission.getSubmissionResults()[0];

    submissionResult.setStdout(evaluationResult.stdout);
    submissionResult.setStatus(evaluationResult.status);

    foundSubmission.setSubmissionResults([submissionResult]);

    await this.submissionRepository.updateSubmissionResult(submissionResult);

    this.logger.log(
      `Execution result: ${JSON.stringify(result)}, updatedSubmission: ${foundSubmission}`,
    );
  }

  private async pollForRequest(
    token: string,
    maxRetries: number,
    retryDelay: number,
  ): Promise<CodeExecutionResponse> {
    const codeExecutionService =
      this.codeExecutionServiceFactory.createService();

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      const response = await codeExecutionService.getSubmission(token);

      if (
        response.getStatus().description !== 'In Queue' &&
        response.getStatus().description !== 'Processing'
      ) {
        return response;
      }

      this.logger.log(
        `Retry attempt ${attempt + 1}/${maxRetries}: Status is ${response.getStatus().description}`,
      );

      await this.delay(retryDelay);
    }

    this.logger.error(
      'Max retries reached. Failed to retrieve a valid submission status.',
    );
    return null;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
