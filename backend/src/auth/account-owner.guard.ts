import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

@Injectable()
export class AccountOwnerGuard implements CanActivate {
  constructor(private readonly queryBus: QueryBus) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userSub = request.auth?.payload.sub;

    if (!userSub) {
      throw new HttpException('A user sub is required', HttpStatus.CONFLICT);
    }

    const foundAccount = await this.accountService.findBySub(userSub);

    if (!foundAccount) {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }

    if (foundAccount.sub !== userSub) {
      throw new HttpException(
        'You do not own this account',
        HttpStatus.CONFLICT,
      );
    }

    request.account = foundAccount;
    return true;
  }
}
