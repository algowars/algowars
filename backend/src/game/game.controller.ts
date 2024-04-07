import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GameService } from './game.service';
import { Throttle, seconds } from '@nestjs/throttler';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { AccountOwnerGuard } from 'src/auth/account-owner.guard';
import { CreateGameDto } from './dtos/create-game.dto';
import { Game } from 'src/data-model/entities/battle/game.entity';
import { AccountNotFoundException } from 'src/account/exceptions/account-not-found.exception';
import { Request } from 'express';
import { PlayerNotFoundException } from 'src/player/exceptions/player-not-found.exception';

@Controller('v1/game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('find')
  findGameById(@Query() { gameId }): Promise<Game> {
    return this.gameService.findGameById(gameId, ['lobby', 'lobby.players']);
  }

  @Throttle({ default: { limit: seconds(15), ttl: 1 } })
  @UseGuards(AuthorizationGuard, AccountOwnerGuard)
  @Post()
  async createGame(
    @Body() createGameDto: CreateGameDto,
    @Req() request: Request,
  ): Promise<Game> {
    if (!request.account) {
      throw new AccountNotFoundException();
    }
    const account = request.account;

    if (!account.player) {
      throw new PlayerNotFoundException();
    }

    return this.gameService.createGame(
      account.player,
      createGameDto?.lobbyName,
    );
  }
}
