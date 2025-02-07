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
    const pageResult = await this.problemQuery.getPageable(
      query.page,
      query.size,
      query.timestamp,
    );

    const mappedResults = pageResult.getResults().map((problem) => ({
      title: problem.getTitle(),
      question: problem.getQuestion(),
      createdAt: problem.getCreatedAt(),
      difficulty: problem.getDifficulty(),
      id: problem.getId().toString(),
      slug: problem.getSlug(),
      tags: problem.getTags().map((tag) => tag.getName()),
    }));

    const result = new GetProblemsPageableResult();
    result.page = pageResult.getPage();
    result.size = pageResult.getSize();
    result.totalPages = pageResult.getTotalPages();
    result.results = mappedResults;

    return result;
  }
}
