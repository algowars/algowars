import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindBatchEvaluationQuery } from './find-batch-evaluation.query';
import { EvaluationService } from 'src/evaluation/services/evaluation.service';
import { Judge0Submission } from 'src/evaluation/dto/judge0/judge0-submission.dto';

@QueryHandler(FindBatchEvaluationQuery)
export class FindBatchEvaluationHandler
  implements IQueryHandler<FindBatchEvaluationQuery>
{
  constructor(private readonly evaluationService: EvaluationService) {}

  async execute({
    tokens,
  }: FindBatchEvaluationQuery): Promise<Judge0Submission[]> {
    return this.evaluationService.getSubmissionByTokens(tokens);
  }
}
