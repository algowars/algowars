import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { Request } from 'express';
import { Account } from 'src/data-model/entities';
import { AccountNotFoundException } from './exceptions/account-not-found.exception';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { CreateAccountDto } from './dtos/create-account.dto';
import { AccountLabel } from './labels/account.label';
import { AccountAlreadyExistException } from './exceptions/account-already-exist.exception';

@Controller('/v1/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(AuthorizationGuard)
  @Get('find/sub')
  async findAccountBySub(@Req() request: Request): Promise<Account> {
    const userSub = request.auth.payload.sub;
    if (!userSub) {
      throw new HttpException(
        AccountLabel.USER_SUB_REQUIRED,
        HttpStatus.CONFLICT,
      );
    }

    return this.accountService.findBySub(userSub);
  }

  @UseGuards(AuthorizationGuard)
  @Post()
  async createAccount(
    @Body() createAccountDto: CreateAccountDto,
    @Req() request: Request,
  ): Promise<Account> {
    const userSub = request.auth.payload.sub;
    if (!userSub) {
      throw new HttpException(
        AccountLabel.USER_SUB_REQUIRED,
        HttpStatus.CONFLICT,
      );
    }

    const foundAccount = await this.accountService.findBySub(userSub);

    if (foundAccount) {
      throw new AccountAlreadyExistException();
    }

    return this.accountService.create(createAccountDto, userSub);
  }
}
