import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProblemBySlugResult } from './find-problem-by-slug-result';
import { Inject, NotFoundException } from '@nestjs/common';
import { ProblemInjectionToken } from '../../injection-token';
import { ProblemQuery } from '../problem-query';
import { FindProblemBySlugQuery } from './find-problem-by-slug.query';
import { ProblemErrorMessage } from 'src/problem/domain/problem-error-message';

@QueryHandler(FindProblemBySlugQuery)
export class FindProblemBySlugHandler
  implements IQueryHandler<FindProblemBySlugQuery, FindProblemBySlugResult>
{
  @Inject(ProblemInjectionToken.PROBLEM_QUERY)
  readonly problemQuery: ProblemQuery;

  async execute(
    query: FindProblemBySlugQuery,
  ): Promise<FindProblemBySlugResult> {
    const problem = await this.problemQuery.findBySlug(query.slug);

    if (!problem) {
      throw new NotFoundException(ProblemErrorMessage.PROBLEM_NOT_FOUND);
    }

    const setup = await this.problemQuery.findSetup(
      problem.getId().toString(),
      query.languageId,
    );

    if (!setup) {
      throw new NotFoundException(ProblemErrorMessage.SETUP_NOT_FOUND);
    }

    return {
      id: problem.getId().toString(),
      title: problem.getTitle(),
      slug: problem.getSlug(),
      initialCode: setup.getInitialCode(),
      question: problem.getQuestion(),
      createdAt: problem.getCreatedAt(),
      updatedAt: problem.getUpdatedAt(),
      createdBy: {
        username: problem.getCreatedBy()?.getUsername().toString() ?? '',
        picture: problem.getCreatedBy()?.getPicture() ?? '',
      },
      tags: problem.getTags()?.map((tag) => ({
        id: tag.getId()?.toNumber(),
        name: tag.getName(),
      })),
      difficulty: problem.getDifficulty(),
    };
  }
}
