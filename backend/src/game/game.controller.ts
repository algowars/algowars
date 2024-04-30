import { Controller, Post, Query } from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from 'src/data-model/entities/game/game';
import { CreateGameDto } from './dtos/create-game.dto';
import { GameType } from 'src/data-model/models/game/game-type';
import { GameBuilder } from './builders/game-builder';
import { CodeRushBuilder } from './builders/code-rush-builder';
import { SurvivalBuilder } from './builders/survival-builder';
import { BattleBuilder } from './builders/battle-builder';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  async createGame(
    @Query()
    createGameDto: CreateGameDto,
  ): Promise<Game> {
    const gameBuilder = this.createGameBuilder(createGameDto);

    gameBuilder.setupGame();

    return gameBuilder.game;
  }

  private createGameBuilder(createGameDto: CreateGameDto): GameBuilder {
    if (createGameDto.gameType === GameType.RUSH) {
      return new CodeRushBuilder();
    }

    if (createGameDto.gameType === GameType.SURVIVAL) {
      return new SurvivalBuilder();
    }

    if (createGameDto.gameType === GameType.BATTLE) {
      return new BattleBuilder();
    }
  }
}
