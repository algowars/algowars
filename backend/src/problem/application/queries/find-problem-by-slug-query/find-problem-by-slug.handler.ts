import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProblemBySlugQuery } from './find-problem-by-slug.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { ProblemErrorMessage } from 'src/problem/domain/problem-error-message';
import { ProblemInjectionToken } from '../../injection-token';
import { FindProblemBySlugResult } from './find-problem-by-slug-result';
import { ProblemQuery } from '../problem-query';

@QueryHandler(FindProblemBySlugQuery)
export class FindProblemBySlugHandler
  implements IQueryHandler<FindProblemBySlugQuery, FindProblemBySlugResult>
{
  @Inject(ProblemInjectionToken.PROBLEM_QUERY)
  readonly problemQuery: ProblemQuery;

  async execute(
    query: FindProblemBySlugQuery,
  ): Promise<FindProblemBySlugResult> {
    const data = await this.problemQuery.findBySlug(
      query.slug,
      query.languageId,
    );

    if (!data) {
      throw new NotFoundException(ProblemErrorMessage.PROBLEM_NOT_FOUND);
    }

    return data;
  }
}
