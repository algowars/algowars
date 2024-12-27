import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { UnauthorizedError } from 'express-oauth2-jwt-bearer';
import { AccountInjectionToken } from 'src/account/application/injection-token';
import { AccountQuery } from 'src/account/application/queries/account-query';
import { FindAccountBySubQuery } from 'src/account/application/queries/find-account-by-sub-query/find-account-by-sub.query';

@Injectable()
export class AccountAuthorizationGuard implements CanActivate {
  @Inject(AccountInjectionToken.ACCOUNT_QUERY)
  private readonly accountQuery: AccountQuery;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const sub = request.auth?.payload?.sub;

    if (!sub) {
      throw new UnauthorizedError('User sub not found');
    }

    const account = await this.accountQuery.findBySub(sub);

    console.log('FOUND ACCOUNT: ', account);

    if (!account) {
      throw new UnauthorizedError('Account not found');
    }

    request.account = account;

    return true;
  }
}
