import { Inject } from '@nestjs/common';
import { Knex } from 'knex';
import { DatabaseInjectionToken, EntityId } from 'lib/database.module';
import { InjectConnection } from 'nest-knexjs';
import { Account } from 'src/account/domain/account';
import { Id, IdImplementation } from 'src/common/domain/id';
import { Game } from 'src/game/domain/game';
import { GameFactory, GameType } from 'src/game/domain/game-factory';
import { GameMode } from 'src/game/domain/game-mode';
import { GameRepository } from 'src/game/domain/game-repository';
import { Lobby } from 'src/game/domain/lobby';
import { LobbyFactory } from 'src/game/domain/lobby-factory';

export class GameRepositoryImplementation implements GameRepository {
  constructor(
    @InjectConnection(DatabaseInjectionToken.WRITE_CONNECTION)
    private readonly knexConnection: Knex,
    @Inject()
    private readonly lobbyFactory: LobbyFactory,
    @Inject()
    private readonly gameFactory: GameFactory,
  ) {}

  async newId(): Promise<Id> {
    return new IdImplementation(new EntityId().toString());
  }

  async createGame(
    account: Account,
    gameMode: GameMode,
    gameType: GameType,
    maxPlayers: number,
  ): Promise<Game> {
    const gameId = await this.newId();
    const lobbyId = await this.newId();

    const game: Game = await this.knexConnection.transaction(async (trx) => {
      await trx('lobbies').insert({
        id: lobbyId.toString(),
        max_players: maxPlayers,
      });

      await trx('lobby_players').insert({
        lobby_id: lobbyId.toString(),
        account_id: account.getId().toString(),
      });

      await trx('games').insert({
        id: gameId.toString(),
        created_by_id: account.getId().toString(),
        lobby_id: lobbyId.toString(),
        game_mode: gameMode,
        game_type: gameType,
      });

      const lobby: Lobby = this.lobbyFactory.create({
        id: lobbyId,
        maxPlayers: maxPlayers,
        players: [],
      });

      const createdGame: Game = this.gameFactory.create({
        id: gameId,
        gameType: gameType,
        createdBy: account,
        createdAt: new Date(),
        gameMode: gameMode,
        lobby,
      });

      return createdGame;
    });

    return game;
  }
}
