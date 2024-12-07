import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAccountByUsernameQuery } from './find-account-by-username.query';
import { FindAccountByUsernameResult } from './find-account-by-username-result';
import { Inject, NotFoundException } from '@nestjs/common';
import { AccountInjectionToken } from '../../injection-token';
import { AccountQuery } from '../account-query';
import { AccountErrorMessage } from 'src/account/domain/account-error-message';

@QueryHandler(FindAccountByUsernameQuery)
export class FindAccountByUsernameHandler
  implements
    IQueryHandler<FindAccountByUsernameQuery, FindAccountByUsernameResult>
{
  @Inject(AccountInjectionToken.ACCOUNT_QUERY)
  readonly accountQuery: AccountQuery;

  async execute(
    query: FindAccountByUsernameQuery,
  ): Promise<FindAccountByUsernameResult> {
    const data = await this.accountQuery.findByUsername(query.username);
    if (!data) {
      throw new NotFoundException(AccountErrorMessage.ACCOUNT_NOT_FOUND);
    }

    return {
      id: data.id,
      username: data.username,
      createdAt: data.createdAt,
    };
  }
}
