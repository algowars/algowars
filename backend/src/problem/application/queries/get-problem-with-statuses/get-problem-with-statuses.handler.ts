import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProblemWithStatusesQuery } from './get-problem-with-statuses.query';
import { GetProblemWithStatusesResult } from './get-problem-with-statuses-result';
import { Inject } from '@nestjs/common';
import { ProblemInjectionToken } from '../../injection-token';
import { ProblemQuery } from '../problem-query';
import { PageResult } from 'src/common/pagination/page-result';

@QueryHandler(GetProblemWithStatusesQuery)
export class GetProblemWithStatusesHandler
  implements
    IQueryHandler<GetProblemWithStatusesQuery, GetProblemWithStatusesResult>
{
  @Inject(ProblemInjectionToken.PROBLEM_QUERY)
  readonly problemQuery: ProblemQuery;

  async execute(
    query: GetProblemWithStatusesQuery,
  ): Promise<PageResult<GetProblemWithStatusesResult>> {
    return this.problemQuery.getAsAdmin(
      query.page,
      query.size,
      query.timestamp,
    );
  }
}
