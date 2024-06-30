import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EvaluationCreatedEvent } from './evaluation-created.event';
import { SubmissionResultEntityRepository } from 'src/submission-result/db/submission-result-entity.repository';
import { EvaluationService } from 'src/evaluation/services/evaluation.service';
import { SubmissionResultTestcase } from 'src/submission-result/entities/submission-result-testcase.entity';
import { SubmissionResultTestcaseEntityRepository } from 'src/submission-result/db/submission-result-testcase/submission-result-testcase-entity.repository';
import { ConfigService } from '@nestjs/config';

@EventsHandler(EvaluationCreatedEvent)
export class EvaluationCreatedHandler
  implements IEventHandler<EvaluationCreatedEvent>
{
  private readonly MAX_REQUESTS_COUNT: number;

  constructor(
    private readonly submissionResultEntityRepository: SubmissionResultEntityRepository,
    private readonly submissionResultTestcaseEntityRepository: SubmissionResultTestcaseEntityRepository,
    private readonly evaluationService: EvaluationService,
    private readonly configService: ConfigService,
  ) {
    this.MAX_REQUESTS_COUNT = this.configService.get<number>(
      'MAX_REQUESTS_COUNT',
      6,
    );
  }

  async handle({ submissionResultId }: EvaluationCreatedEvent): Promise<void> {
    console.log('SUBMISSIONSRESULTS ID: ', submissionResultId);
    const submissionResult =
      await this.submissionResultEntityRepository.findByIdWithTestcases(
        submissionResultId,
      );

    const invalidStatuses = [1, 2, 3];
    const tokens = submissionResult
      .getTestcases()
      .map((testcase) => testcase.getToken());

    let requestCount = 0;

    while (requestCount <= this.MAX_REQUESTS_COUNT) {
      requestCount++;

      const pendingTestcases = submissionResult
        ?.getTestcases()
        .filter(
          (testcase) =>
            !testcase.getStatusId() ||
            invalidStatuses.includes(testcase.getStatusId()),
        );

      if (pendingTestcases.length === 0) {
        break;
      }

      const judgeSubmissions =
        await this.evaluationService.getSubmissionByTokens(tokens);

      const submissionsToUpdate: SubmissionResultTestcase[] = [];

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
          testcase.setStatusId(submission.status_id);
          testcase.setStderr(submission.stderr);
          submissionsToUpdate.push(testcase);
        }
      }

      await this.submissionResultTestcaseEntityRepository.updateBatch(
        submissionsToUpdate,
      );

      const stillPending = submissionResult
        .getTestcases()
        .some((testcase) => invalidStatuses.includes(testcase.getStatusId()));
      if (!stillPending) {
        break;
      }

      await new Promise((res) => setTimeout(res, 5000)); // Wait for 3 seconds before the next poll
    }
  }
}
