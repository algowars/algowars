import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { UnauthorizedError } from 'express-oauth2-jwt-bearer';
import { FindAccountBySubQuery } from 'src/account/application/queries/find-account-by-sub-query/find-account-by-sub.query';

@Injectable()
export class AccountAuthorizationGuard implements CanActivate {
  constructor(private readonly queryBus: QueryBus) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const sub = request.auth?.payload?.sub;

    if (!sub) {
      throw new UnauthorizedError('User sub not found');
    }

    const account = await this.queryBus.execute(new FindAccountBySubQuery(sub));

    if (!account) {
      throw new UnauthorizedError('Account not found');
    }

    request.account = account;

    return true;
  }
}
