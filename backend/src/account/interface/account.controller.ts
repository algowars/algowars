import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { OpenAccountRequest } from './dto/request/open-account-request.dto';
import { OpenAccountCommand } from '../application/commands/open-account/open-account.command';
import { Id } from 'src/common/domain/id';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { Request } from 'express';

@Controller('v1/account')
export class AccountController {
  constructor(private readonly commandBus: CommandBus) {}

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
}
