import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAdminProblemQuery } from './get-admin-problem.query';
import { GetAdminProblemResult } from './get-admin-problem-result';
import { Inject, NotFoundException } from '@nestjs/common';
import { AccountInjectionToken } from '../../injection-token';
import { AccountQuery } from '../account-query';

@QueryHandler(GetAdminProblemQuery)
export class GetAdminProblemHandler
  implements IQueryHandler<GetAdminProblemQuery, GetAdminProblemResult>
{
  @Inject(AccountInjectionToken.ACCOUNT_QUERY)
  readonly accountQuery: AccountQuery;

  async execute(query: GetAdminProblemQuery): Promise<GetAdminProblemResult> {
    const problem = await this.accountQuery.getAdminProblem(query.slug);

    if (!problem) throw new NotFoundException('Problem not found');

    return {
      title: problem.getTitle(),
    };
  }
}
