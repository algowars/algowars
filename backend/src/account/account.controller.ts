import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { Request } from 'express';
import { Account } from 'src/data-model/entities';
import { AccountNotFoundException } from './exceptions/account-not-found.exception';
import { AuthorizationGuard } from 'src/auth/authorization.guard';

@Controller('/v1/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(AuthorizationGuard)
  @Get('find/sub')
  async findAccountBySub(@Req() request: Request): Promise<Account> {
    const userSub = request.auth.payload.sub;
    if (!userSub) {
      throw new AccountNotFoundException();
    }

    return this.accountService.findAccountBySub(userSub);
  }
}
