import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProblemBySlugQuery } from './find-problem-by-slug.query';
import { ProblemResult } from './problem-result';

@QueryHandler(FindProblemBySlugQuery)
export class FindProblemBySlugHandler
  implements IQueryHandler<FindProblemBySlugQuery, ProblemResult>
{
  execute(query: FindProblemBySlugQuery): Promise<ProblemResult> {
    throw new Error('Method not implemented.');
  }
}
