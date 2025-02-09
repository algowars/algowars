import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAdminProblemsQuery } from './get-admin-problem.query';
import { GetAdminProblemsResult } from './get-admin-problems-result';
import { Inject } from '@nestjs/common';
import { AccountInjectionToken } from '../../injection-token';
import { AccountQuery } from '../account-query';

@QueryHandler(GetAdminProblemsQuery)
export class GetAdminProblemsHandler
  implements IQueryHandler<GetAdminProblemsQuery, GetAdminProblemsResult>
{
  @Inject(AccountInjectionToken.ACCOUNT_QUERY)
  readonly accountQuery: AccountQuery;

  async execute(query: GetAdminProblemsQuery): Promise<GetAdminProblemsResult> {
    const pageResult = await this.accountQuery.getAdminProblems(
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
      status: problem.getStatus(),
      createdBy: {
        id: problem.getCreatedBy()?.getId().toString(),
        username: problem.getCreatedBy()?.getUsername().toString(),
      },
    }));

    const result = new GetAdminProblemsResult();
    result.page = pageResult.getPage();
    result.size = pageResult.getSize();
    result.totalPages = pageResult.getTotalPages();
    result.results = mappedResults;

    return result;
  }
}
