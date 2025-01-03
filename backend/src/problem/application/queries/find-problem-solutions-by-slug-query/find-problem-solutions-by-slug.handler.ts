import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProblemSolutionsBySlugResult } from './find-problem-solutions-by-slug-result';
import { Inject, NotFoundException } from '@nestjs/common';
import { ProblemInjectionToken } from '../../injection-token';
import { ProblemQuery } from '../problem-query';
import { ProblemErrorMessage } from 'src/problem/domain/problem-error-message';
import { FindProblemSolutionsBySlugQuery } from './find-problem-solutions-by-slug.query';

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

  async execute(
    query: FindProblemSolutionsBySlugQuery,
  ): Promise<FindProblemSolutionsBySlugResult> {
    const problem = await this.problemQuery.findBySlug(query.slug);

    if (!problem) {
      throw new NotFoundException(ProblemErrorMessage.PROBLEM_NOT_FOUND);
    }

    const submissions = await this.problemQuery.getSolutions(problem.getId());

    return {
      problem: {
        id: problem.getId().toString(),
        title: problem.getTitle(),
        slug: problem.getSlug(),
        question: problem.getQuestion(),
        createdAt: problem.getCreatedAt(),
        createdBy: problem.getCreatedBy()?.getUsername().toString() ?? '',
      },
      submissions: submissions?.map((submission) => ({
        sourceCode: submission.getSourceCode(),
        language: submission.getLanguage()
          ? {
              id: submission.getLanguage().getId().toNumber(),
              name: submission.getLanguage().getName(),
            }
          : null,
        createdBy: submission.getCreatedBy()?.getUsername().toString() ?? '',
        createdAt: submission.getCreatedAt(),
        status: submission.getAggregateStatus(),
      })),
    };
  }
}
