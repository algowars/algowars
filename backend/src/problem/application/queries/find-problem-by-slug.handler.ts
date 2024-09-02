import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProblemBySlugQuery } from './find-problem-by-slug.query';
import { ProblemResult } from './problem-result';
import { Inject, NotFoundException } from '@nestjs/common';
import { InjectionToken } from '../injection-token';
import { ProblemQuery } from './problem-query';
import { ProblemErrorMessage } from 'src/problem/domain/problem-error-message';

@QueryHandler(FindProblemBySlugQuery)
export class FindProblemBySlugHandler
  implements IQueryHandler<FindProblemBySlugQuery, ProblemResult>
{
  @Inject(InjectionToken.PROBLEM_QUERY) readonly problemQuery: ProblemQuery;

  async execute(query: FindProblemBySlugQuery): Promise<ProblemResult> {
    const data = await this.problemQuery.findBySlug(query.slug);
    if (!data) {
      throw new NotFoundException(ProblemErrorMessage.PROBLEM_NOT_FOUND);
    }
  }
}
