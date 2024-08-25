import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindBatchEvaluationQuery } from './find-batch-evaluation.query';
import { EvaluationService } from 'src/evaluation/services/evaluation.service';
import { Judge0Submission } from 'src/evaluation/dto/judge0/judge0-submission.dto';

@QueryHandler(FindBatchEvaluationQuery)
export class FindBatchEvaluationHandler
  implements IQueryHandler<FindBatchEvaluationQuery>
{
  // Injects the EvaluationService to access submission data
  constructor(private readonly evaluationService: EvaluationService) {}

  // Handles the FindBatchEvaluationQuery to fetch batch evaluation results
  async execute({
    tokens,
  }: FindBatchEvaluationQuery): Promise<Judge0Submission[]> {
    // Uses the EvaluationService to retrieve submissions by their tokens
    return this.evaluationService.getSubmissionByTokens(tokens);
  }
}
