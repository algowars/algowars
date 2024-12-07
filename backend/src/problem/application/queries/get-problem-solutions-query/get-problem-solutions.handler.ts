import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProblemSolutionsQuery } from './get-problem-solutions.query';
import { GetProblemSolutionsResult } from './get-problem-solutions.result';
import { Inject, NotFoundException } from '@nestjs/common';
import { ProblemInjectionToken } from '../../injection-token';
import { ProblemQuery } from '../problem-query';
import { ProblemErrorMessage } from 'src/problem/domain/problem-error-message';

@QueryHandler(GetProblemSolutionsQuery)
export class GetProblemSolutionsHandler
  implements IQueryHandler<GetProblemSolutionsQuery, GetProblemSolutionsResult>
{
  @Inject(ProblemInjectionToken.PROBLEM_QUERY)
  readonly problemQuery: ProblemQuery;

  async execute(
    query: GetProblemSolutionsQuery,
  ): Promise<GetProblemSolutionsResult> {
    const data = await this.problemQuery.findBySlugWithSolutions(
      query.slug,
      query.account,
    );

    if (!data) {
      throw new NotFoundException(ProblemErrorMessage.PROBLEM_NOT_FOUND);
    }

    return data;
  }
}
