import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAccountStatsByUsernameQuery } from './find-account-stats-by-username.query';
import { Inject } from '@nestjs/common';
import { AccountInjectionToken } from '../../injection-token';
import { AccountQuery } from '../account-query';
import { FindAccountStatsByUsernameResult } from './find-account-stats-by-username-result';

@QueryHandler(FindAccountStatsByUsernameQuery)
export class FindAccountStatsByUsernameHandler
  implements
    IQueryHandler<
      FindAccountStatsByUsernameQuery,
      FindAccountStatsByUsernameResult
    >
{
  @Inject(AccountInjectionToken.ACCOUNT_QUERY)
  private readonly accountQuery: AccountQuery;

  async execute(
    query: FindAccountStatsByUsernameQuery,
  ): Promise<FindAccountStatsByUsernameResult> {
    const account = await this.accountQuery.findByUsername(
      query.username.toString(),
    );

    const totalSubmissions = await this.accountQuery.getTotalSubmissions(
      account.getId(),
    );

    return {
      totalSubmissions,
    };
  }
}
