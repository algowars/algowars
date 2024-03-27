import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { CreateAccountDto } from './dtos/create-account.dto';
import { Request } from 'express';
import { Account } from 'src/data-model/entities';
import { AccountOwnerGuard } from 'src/auth/account-owner.guard';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(AuthorizationGuard)
  @UseGuards(AccountOwnerGuard)
  @Get('find/sub')
  findAccountBySub(@Req() request: Request): Promise<Account> {
    const userSub = request.auth.payload.sub;

    return this.accountService.findBySub(userSub);
  }

  @UseGuards(AuthorizationGuard)
  @UseGuards(AccountOwnerGuard)
  @Post()
  async createAccount(
    @Body() createAccountDto: CreateAccountDto,
    @Req() request: Request,
  ): Promise<Account> {
    const userSub = request.auth.payload.sub;

    return this.accountService.create(createAccountDto, userSub);
  }
}
