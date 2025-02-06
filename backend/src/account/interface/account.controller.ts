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
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { Request } from 'express';
import { FindAccountBySubQuery } from '../application/queries/find-account-by-sub-query/find-account-by-sub.query';
import { OpenAccountRequest } from './dto/request/open-account-request.dto';
import { FindAccountByUsername } from './dto/request/find-account-by-username.dto';
import { FindAccountBySubResponseDto } from './dto/response/find-account-by-sub-response.dto';
import { Account } from '../domain/account';
import { FindProfileInformationResult } from '../application/queries/find-profile-information-query/find-profile-information-result';
import { FindProfileInformationQuery } from '../application/queries/find-profile-information-query/find-profile-information.query';
import { UsernameImplementation } from '../domain/username';
import { AccountAuthorizationGuard } from 'src/auth/account-authorization.guard';
import { FindAccountStatsByUsernameResult } from '../application/queries/find-account-stats-by-username-query/find-account-stats-by-username-result';
import { FindAccountStatsByUsernameQuery } from '../application/queries/find-account-stats-by-username-query/find-account-stats-by-username.query';

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

  @Get('find/username/:username/profile')
  async getProfileInformation(
    @Param() param: FindAccountByUsername,
  ): Promise<FindProfileInformationResult> {
    return this.queryBus.execute(
      new FindProfileInformationQuery(
        new UsernameImplementation(param.username),
      ),
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

  @UseGuards(AuthorizationGuard, AccountAuthorizationGuard)
  @Get('find/username/:username/stats')
  async getUserStats(
    @Param() param: FindAccountByUsername,
  ): Promise<FindAccountStatsByUsernameResult> {
    const stats = await this.queryBus.execute(
      new FindAccountStatsByUsernameQuery(
        new UsernameImplementation(param.username),
      ),
    );

    return stats;
  }
}
