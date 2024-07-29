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
// AccountController handles HTTP requests for account-related operations.
export class AccountController {
  constructor(
    private readonly commandBus: CommandBus, // CommandBus to handle command execution.
    private readonly queryBus: QueryBus, // QueryBus to handle query execution.
  ) { }

  @UseGuards(AuthorizationGuard) // Uses AuthorizationGuard to protect the route.
  @Get(':id') // Handles GET requests to /v1/account/:id.
  findAccountById(
    @Param() findAccountDto: FindAccountDto, // Retrieves the account ID from the route parameters.
  ): Promise<AccountDto> {
    // Executes the FindAccountByIdQuery with the provided account ID and returns the AccountDto.
    return this.queryBus.execute<FindAccountByIdQuery, AccountDto>(
      new FindAccountByIdQuery(findAccountDto.id),
    );
  }

  @UseGuards(AuthorizationGuard) // Uses AuthorizationGuard to protect the route.
  @Get('find/sub') // Handles GET requests to /v1/account/find/sub.
  findAccountBySub(@Req() request: Request): Promise<AccountDto> {
    const sub = request.auth.payload.sub; // Retrieves the 'sub' field from the request's auth payload.

    // Executes the FindAccountBySubQuery with the provided 'sub' and returns the AccountDto.
    return this.queryBus.execute<FindAccountBySubQuery, AccountDto>(
      new FindAccountBySubQuery(sub),
    );
  }

  @UseGuards(AuthorizationGuard) // Uses AuthorizationGuard to protect the route.
  @Post() // Handles POST requests to /v1/account.
  async createAccount(
    @Body() createAccountRequest: CreateAccountRequest, // Retrieves the CreateAccountRequest from the request body.
    @Req() request: Request, // Retrieves the request object.
  ): Promise<string> {
    const sub = request.auth.payload.sub; // Retrieves the 'sub' field from the request's auth payload.

    // Executes the CreateAccountCommand with the CreateAccountRequest and 'sub', and returns the account ID.
    const accountId = await this.commandBus.execute<
      CreateAccountCommand,
      string
    >(new CreateAccountCommand(createAccountRequest, sub));

    return accountId;
  }
}
