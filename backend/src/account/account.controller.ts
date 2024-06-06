import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateAccountRequest } from './dto/request/create-account-request.dto';
import { CreateAccountCommand } from './commands/create-account/create-account.command';
import { Request } from 'express';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { FindAccountDto } from './dto/request/find-account.dto';
import { AccountDto } from './dto/account.dto';
import { FindAccountByIdQuery } from './queries/find-account-by-id/find-account-by-id.query';
import { FindAccountBySubQuery } from './queries/find-account-by-sub/find-account-by-sub.query';

@Controller('v1/account')
export class AccountController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Get(':id')
  findAccountById(
    @Param() findAccountDto: FindAccountDto,
  ): Promise<AccountDto> {
    return this.queryBus.execute<FindAccountByIdQuery, AccountDto>(
      new FindAccountByIdQuery(findAccountDto.id),
    );
  }

  @UseGuards(AuthorizationGuard)
  @Get('find/sub')
  findAccountBySub(@Req() request: Request): Promise<AccountDto> {
    const sub = request.auth.payload.sub;

    return this.queryBus.execute<FindAccountBySubQuery, AccountDto>(
      new FindAccountBySubQuery(sub),
    );
  }

  @UseGuards(AuthorizationGuard)
  @Post()
  async createAccount(
    @Body() createAccountRequest: CreateAccountRequest,
    @Req() request: Request,
  ): Promise<string> {
    const sub = request.auth.payload.sub;

    const accountId = await this.commandBus.execute<
      CreateAccountCommand,
      string
    >(new CreateAccountCommand(createAccountRequest, sub));

    return accountId;
  }
}
