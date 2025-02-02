import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Request } from 'express';
import { AccountAuthorizationGuard } from 'src/auth/account-authorization.guard';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { CreateProblemRushGameCommand } from '../application/commands/create-problem-rush-game/create-problem-rush-game.command';
import { Id } from 'src/common/domain/id';
import { GameMode } from '../domain/game-mode';

@Controller('v1/game')
export class GameController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @UseGuards(AuthorizationGuard, AccountAuthorizationGuard)
  @Post('rush/solo')
  async createSoloRush(@Req() request: Request): Promise<string> {
    const account = request?.account;

    const id = await this.commandBus.execute<CreateProblemRushGameCommand, Id>(
      new CreateProblemRushGameCommand(account, GameMode.SOLO),
    );

    return id.toString();
  }
}
