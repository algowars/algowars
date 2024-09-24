import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { OpenAccountRequest } from './dto/request/open-account-request.dto';
import { OpenAccountCommand } from '../application/commands/open-account/open-account.command';
import { Id } from 'src/common/domain/id';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { Request } from 'express';
import { FindAccountBySubResponseDto } from './dto/response/find-account-by-sub-response.dto';
import { FindAccountBySubQuery } from '../application/queries/find-account-by-sub-query/find-account-by-sub.query';

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
  ): Promise<string> {
    const sub = request.auth.payload.sub;

    const id = await this.commandBus.execute<OpenAccountCommand, Id>(
      new OpenAccountCommand(sub, body.username),
    );

    return id.toString();
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
