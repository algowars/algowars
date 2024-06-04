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

@Controller('v1/account')
export class AccountController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Get(':id')
  findProblem(@Param() findAccountDto: FindAccountDto): Promise<AccountDto> {
    return this.queryBus.execute<FindAccountByIdQuery, AccountDto>(
      new FindAccountByIdQuery(findAccountDto.id),
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
