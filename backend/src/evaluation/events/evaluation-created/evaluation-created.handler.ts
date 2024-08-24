import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EvaluationCreatedEvent } from './evaluation-created.event';
import { SubmissionResultEntityRepository } from 'src/submission-result/db/submission-result-entity.repository';
import { EvaluationService } from 'src/evaluation/services/evaluation.service';
import { SubmissionResultTestcase } from 'src/submission-result/entities/submission-result-testcase.entity';
import { SubmissionResultTestcaseEntityRepository } from 'src/submission-result/db/submission-result-testcase/submission-result-testcase-entity.repository';
import { ConfigService } from '@nestjs/config';

@EventsHandler(EvaluationCreatedEvent)
export class EvaluationCreatedHandler
  implements IEventHandler<EvaluationCreatedEvent> {
  // Maximum number of times to request status updates for the submission
  private readonly MAX_REQUESTS_COUNT: number;

  constructor(
    // Repository for accessing and managing submission result entities
    private readonly submissionResultEntityRepository: SubmissionResultEntityRepository,

    // Repository for managing submission result testcase entities
    private readonly submissionResultTestcaseEntityRepository: SubmissionResultTestcaseEntityRepository,

    // Service responsible for handling evaluations, including interactions with external judge systems
    private readonly evaluationService: EvaluationService,

    // Configuration service to access environment variables and configuration settings
    private readonly configService: ConfigService,
  ) {
    // Fetches the maximum request count from configuration, defaults to 6 if not specified
    this.MAX_REQUESTS_COUNT = this.configService.get<number>(
      'MAX_REQUESTS_COUNT',
      6,
    );
  }

  // Handles the EvaluationCreatedEvent
  async handle({ submissionResult }: EvaluationCreatedEvent): Promise<void> {
    // Invalid status IDs that indicate the submission is not yet complete or encountered errors
    const invalidStatuses = [1, 2, 3];

    // Extracts the tokens from each testcase in the submission result
    const tokens = submissionResult
      .getTestcases()
      .map((testcase) => testcase.getToken());

    let requestCount = 0;

    // Loop to repeatedly check the status of the test cases until they are all resolved or the max request count is reached
    while (requestCount <= this.MAX_REQUESTS_COUNT) {
      requestCount++;

      // Filter to find test cases that are still pending or have invalid statuses
      const pendingTestcases = submissionResult
        ?.getTestcases()
        .filter(
          (testcase) =>
            !testcase.getStatusId() ||
            invalidStatuses.includes(testcase.getStatusId()),
        );

      // If no pending test cases, break the loop
      if (pendingTestcases.length === 0) {
        break;
      }

      // Fetches the latest submission statuses from the evaluation service
      const judgeSubmissions =
        await this.evaluationService.getSubmissionByTokens(tokens);

      const submissionsToUpdate: SubmissionResultTestcase[] = [];

      // Update the status and results of each test case based on the fetched submission data
      for (const submission of judgeSubmissions) {
        const testcase = submissionResult
          ?.getTestcases()
          .find((testcase) => testcase.getToken() === submission.token);
        if (testcase) {
          testcase.setStatusId(submission.status_id);
          testcase.setSourceCode(submission.source_code);
          testcase.setStdin(submission.stdin);
          testcase.setStdout(submission.stdout);
          testcase.setExpectedOutput(submission.expected_output);
          testcase.setStderr(submission.stderr);
          submissionsToUpdate.push(testcase);
        }
      }

      // Batch update the test cases in the repository
      await this.submissionResultTestcaseEntityRepository.updateBatch(
        submissionsToUpdate,
      );

      // Check if any test cases are still pending
      const stillPending = submissionResult
        .getTestcases()
        .some((testcase) => invalidStatuses.includes(testcase.getStatusId()));
      if (!stillPending) {
        break;
      }

      // Wait for 5 seconds before the next polling iteration
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
}
