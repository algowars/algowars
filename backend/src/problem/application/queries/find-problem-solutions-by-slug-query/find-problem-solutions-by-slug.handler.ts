import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProblemSolutionsBySlugResult } from './find-problem-solutions-by-slug-result';
import { FindProblemSolutionsBySlugQuery } from 'src/problem/interface/dto/request/find-problem-solutions-by-slug-query.dto';
import { Inject } from '@nestjs/common';
import { ProblemInjectionToken } from '../../injection-token';
import { ProblemQuery } from '../problem-query';

@QueryHandler(FindProblemSolutionsBySlugQuery)
export class FindProblemSolutionsBySlugHandler
  implements
    IQueryHandler<
      FindProblemSolutionsBySlugQuery,
      FindProblemSolutionsBySlugResult
    >
{
  @Inject(ProblemInjectionToken.PROBLEM_QUERY)
  private readonly problemQuery: ProblemQuery;

  async execute(query: FindProblemSolutionsBySlugQuery): Promise<FindProblemSolutionsBySlugResult> {
      const problem = 
  }
}
