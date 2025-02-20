import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SubmissionCreatedEvent } from 'src/submission/domain/events/submission-created-event';
import { SubmissionRepository } from 'src/submission/domain/submission-repository';
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

  async handle(event: SubmissionCreatedEvent): Promise<void> {
    const foundSubmission = await this.submissionRepository.findById(
      event.submissionId,
    );

    if (!foundSubmission.getLanguage()) {
      throw new InternalServerErrorException(
        'Language cannot be found from submission',
      );
    }

    const maxRetries = 10;
    const retryDelay = 4_000;

    const results = await this.pollForRequest(
      foundSubmission.getResults().map((result) => result.getToken()),
      maxRetries,
      retryDelay,
    );

    const evaluator = this.codeExecutionEvaluationResultFactory.getEvaluator(
      foundSubmission.getLanguage(),
    );

    const evaluationResults = results.map((result) =>
      evaluator.evaluate(
        result,
        foundSubmission.getResultByToken(result.getToken()).getTestType(),
      ),
    );

    const submissionResults = foundSubmission.getResults();

    console.log('FINAL LRESULTS: ', submissionResults);

    submissionResults.forEach((submissionResult, index) => {
      submissionResult.setStdout(evaluationResults[index].stdout);
      submissionResult.setStatus(evaluationResults[index].status);
    });

    foundSubmission.setResults(submissionResults);

    await this.submissionRepository.updateResults(submissionResults);

    this.logger.log(
      `Execution results: ${JSON.stringify(results)}, updatedSubmission: ${foundSubmission}`,
    );
  }

  private async pollForRequest(
    tokens: string[],
    maxRetries: number,
    retryDelay: number,
  ): Promise<CodeExecutionResponse[]> {
    const codeExecutionService =
      this.codeExecutionServiceFactory.createService();

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      const responses = await codeExecutionService.getBatchSubmissions(tokens);

      const completedResponses = responses.filter(
        (response) =>
          response.getStatus().description !== 'In Queue' &&
          response.getStatus().description !== 'Processing',
      );

      if (completedResponses.length === responses.length) {
        return responses;
      }

      this.logger.log(
        `Retry attempt ${attempt + 1}/${maxRetries}: Statuses are ${responses
          .map((response) => response.getStatus().description)
          .join(', ')}`,
      );

      await this.delay(retryDelay);
    }

    this.logger.error(
      'Max retries reached. Failed to retrieve valid submission statuses.',
    );
    return [];
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
