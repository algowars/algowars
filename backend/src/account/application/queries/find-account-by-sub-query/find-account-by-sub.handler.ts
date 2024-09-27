import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAccountBySubQuery } from './find-account-by-sub.query';
import { FindAccountBySubResult } from './find-account-by-sub-result';
import { Inject, NotFoundException } from '@nestjs/common';
import { InjectionToken } from '../../injection-token';
import { AccountQuery } from '../account-query';
import { AccountErrorMessage } from 'src/account/domain/account-error-message';

@QueryHandler(FindAccountBySubQuery)
export class FindAccountBySubHandler
  implements IQueryHandler<FindAccountBySubQuery, FindAccountBySubResult>
{
  @Inject(InjectionToken.ACCOUNT_QUERY) readonly accountQuery: AccountQuery;

  async execute(query: FindAccountBySubQuery): Promise<FindAccountBySubResult> {
    const data = await this.accountQuery.findBySub(query.sub);
    if (!data) {
      throw new NotFoundException(AccountErrorMessage.ACCOUNT_NOT_FOUND);
    }

    return data;
  }
}
