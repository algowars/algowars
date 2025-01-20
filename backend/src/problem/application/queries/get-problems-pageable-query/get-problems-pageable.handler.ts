import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProblemsPageableQuery } from './get-problems-pageable.query';
import { GetProblemsPageableResult } from './get-problems-pageable-result';
import { Inject } from '@nestjs/common';
import { ProblemInjectionToken } from '../../injection-token';
import { ProblemQuery } from '../problem-query';

@QueryHandler(GetProblemsPageableQuery)
export class GetProblemsPageableHandler
  implements IQueryHandler<GetProblemsPageableQuery, GetProblemsPageableResult>
{
  @Inject(ProblemInjectionToken.PROBLEM_QUERY)
  readonly problemQuery: ProblemQuery;

  async execute(
    query: GetProblemsPageableQuery,
  ): Promise<GetProblemsPageableResult> {
    return this.problemQuery.getPageable(
      query.page,
      query.size,
      query.timestamp,
    );
  }
}
