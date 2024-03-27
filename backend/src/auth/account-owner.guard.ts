import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
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

    const foundAccount = await this.accountService.findBySub(userSub, {
      select: {
        sub: true,
      },
    });
    console.log(foundAccount);
    if (foundAccount.sub !== userSub) {
      throw new AccountNotOwnedException();
    }

    return true;
  }
}
