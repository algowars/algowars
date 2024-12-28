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
import { OpenAccountCommand } from '../application/commands/open-account/open-account.command';
import { Id } from 'src/common/domain/id';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { Request } from 'express';
import { FindAccountBySubQuery } from '../application/queries/find-account-by-sub-query/find-account-by-sub.query';
import { OpenAccountRequest } from './dto/request/open-account-request.dto';
import { FindAccountByUsername } from './dto/request/find-account-by-username.dto';
import { FindAccountBySubResponseDto } from './dto/response/find-account-by-sub-response.dto';
import { FindAccountByUsernameQuery } from '../application/queries/find-account-by-username/find-account-by-username.query';
import { FindAccountByUsernameResult } from '../application/queries/find-account-by-username/find-account-by-username-result';
import { Account } from '../domain/account';

@Controller('v1/account')
export class AccountController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Post()
  async openAccount(
    @Body() body: OpenAccountRequest,
    @Req() request: Request,
  ): Promise<{
    id: string;
    username: string;
    createdAt: Date;
  }> {
    const sub = request.auth.payload.sub;

    const account = await this.commandBus.execute<OpenAccountCommand, Account>(
      new OpenAccountCommand(sub, body.username),
    );

    return {
      id: account.getId().toString(),
      username: account.getUsername().toString(),
      createdAt: account.getCreatedAt(),
    };
  }

  @Get('find/username/:username')
  async findAccountByUsername(
    @Param() param: FindAccountByUsername,
  ): Promise<FindAccountByUsernameResult> {
    return this.queryBus.execute(
      new FindAccountByUsernameQuery(param.username),
    );
  }

  @UseGuards(AuthorizationGuard)
  @Get('find/sub')
  async getAccount(
    @Req() request: Request,
  ): Promise<FindAccountBySubResponseDto> {
    const sub = request.auth.payload.sub;

    const foundAccount = await this.queryBus.execute(
      new FindAccountBySubQuery(sub),
    );

    return {
      sub: foundAccount.sub,
      username: foundAccount.username,
      createdAt: foundAccount.createdAt,
    };
  }
}
