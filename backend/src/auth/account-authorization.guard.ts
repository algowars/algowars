import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UnauthorizedError } from 'express-oauth2-jwt-bearer';
import { AccountInjectionToken } from 'src/account/application/injection-token';
import { AccountQuery } from 'src/account/application/queries/account-query';

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

    if (!account) {
      throw new UnauthorizedError('Account not found');
    }

    request.account = account;

    return true;
  }
}
