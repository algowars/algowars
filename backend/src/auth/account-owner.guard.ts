import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { AccountNotFoundException } from 'src/account/exceptions/account-not-found.exception';
import { AccountNotOwnedException } from 'src/account/exceptions/account-not-owned.exception';
import { AccountLabel } from 'src/account/labels/account.label';

@Injectable()
export class AccountOwnerGuard implements CanActivate {
  constructor(private readonly accountService: AccountService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userSub = request.auth?.payload.sub;

    if (!userSub) {
      throw new HttpException(
        AccountLabel.USER_SUB_REQUIRED,
        HttpStatus.CONFLICT,
      );
    }

    const foundAccount = await this.accountService.findBySub(userSub);

    if (!foundAccount) {
      throw new AccountNotFoundException();
    }

    if (foundAccount.sub !== userSub) {
      throw new AccountNotOwnedException();
    }

    request.account = foundAccount;
    return true;
  }
}
