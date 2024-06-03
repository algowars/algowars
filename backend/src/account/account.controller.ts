import { Body, Controller, Post, Req } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateAccountRequest } from './dto/request/create-account-request.dto';
import { CreateAccountCommand } from './commands/create-account/create-account.command';
import { Request } from 'express';

@Controller('v1/account')
export class AccountController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

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
