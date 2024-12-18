import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProblemsPageableQuery } from './get-problems-pageable.query';
import { GetProblemsPageableResult } from './get-problems-pageable-result';
import { Inject } from '@nestjs/common';
import { ProblemQuery } from '../problem-query';
import { PageResult } from 'src/common/pagination/page-result';
import { ProblemInjectionToken } from '../../injection-token';

@QueryHandler(GetProblemsPageableQuery)
export class GetProblemsPageableHandler
  implements IQueryHandler<GetProblemsPageableQuery, GetProblemsPageableResult>
{
  @Inject(ProblemInjectionToken.PROBLEM_QUERY)
  readonly problemQuery: ProblemQuery;

  async execute(
    query: GetProblemsPageableQuery,
  ): Promise<PageResult<GetProblemsPageableResult>> {
    return this.problemQuery.getPageable(
      query.page,
      query.size,
      query.timestamp,
    );
  }
}
