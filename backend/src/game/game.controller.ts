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
import { FindGameDto } from './dtos/find-game.dto';
import { Account } from 'src/data-model/entities';

@Controller('v1/game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('find')
  findGameById(@Query() findGameDto: FindGameDto): Promise<Game> {
    const relations = ['lobby', 'lobby.players'];

    if (findGameDto.sessions) {
      relations.push('sessions');
    }

    return this.gameService.findGameById(findGameDto.gameId, relations);
  }

  @Throttle({ default: { limit: seconds(15), ttl: 1 } })
  @UseGuards(AuthorizationGuard, AccountOwnerGuard)
  @Post()
  async createGame(
    @Body() createGameDto: CreateGameDto,
    @Req() request: Request,
  ): Promise<Game> {
    this.validatePrivateAccount(request);
    const account = this.mapPrivateAccount(request);

    return this.gameService.createGame(
      account.player,
      createGameDto?.lobbyName,
    );
  }

  private validatePrivateAccount(request: Request): void {
    if (!request.account) {
      throw new AccountNotFoundException();
    }
    const account = request.account;

    if (!account.player) {
      throw new PlayerNotFoundException();
    }
  }

  private mapPrivateAccount(request: Request): Account {
    return request.account;
  }
}
