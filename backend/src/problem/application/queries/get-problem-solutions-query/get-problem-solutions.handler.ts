import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProblemSolutionsQuery } from './get-problem-solutions.query';
import { GetProblemSolutionsResult } from './get-problem-solutions.result';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection-token';
import { ProblemQuery } from '../problem-query';

@QueryHandler(GetProblemSolutionsQuery)
export class GetProblemSolutionsHandler
  implements IQueryHandler<GetProblemSolutionsQuery, GetProblemSolutionsResult>
{
  @Inject(InjectionToken.PROBLEM_QUERY) readonly problemQuery: ProblemQuery;

  execute(query: GetProblemSolutionsQuery): Promise<GetProblemSolutionsResult> {
    throw new Error('Method not implemented.');
  }
}
