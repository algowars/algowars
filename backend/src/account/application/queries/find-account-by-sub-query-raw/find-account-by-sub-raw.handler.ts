import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAccountBySubRawQuery } from './find-account-by-sub-raw.query';
import { Account } from 'src/account/domain/account';
import { Inject, NotFoundException } from '@nestjs/common';
import { InjectionToken } from '../../injection-token';
import { AccountQuery } from '../account-query';
import { AccountErrorMessage } from 'src/account/domain/account-error-message';
import { AccountFactory } from 'src/account/domain/account-factory';

@QueryHandler(FindAccountBySubRawQuery)
export class FindAccountBySubRawHandler
  implements IQueryHandler<FindAccountBySubRawQuery, Account>
{
  @Inject(InjectionToken.ACCOUNT_QUERY) readonly accountQuery: AccountQuery;
  @Inject() accountFactory: AccountFactory;

  async execute(query: FindAccountBySubRawQuery): Promise<Account> {
    const data = await this.accountQuery.findBySubRaw(query.sub);
    if (!data) {
      throw new NotFoundException(AccountErrorMessage.ACCOUNT_NOT_FOUND);
    }

    return this.accountFactory.createFromEntity(data);
  }
}
