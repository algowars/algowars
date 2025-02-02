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
  ) {}
  @Inject()
  lobbyFactory: LobbyFactory;
  @Inject()
  gameFactory: GameFactory;

  async newId(): Promise<Id> {
    return new IdImplementation(new EntityId().toString());
  }

  async createGame(
    account: Account,
    gameMode: GameMode,
    gameType: GameType,
  ): Promise<Game> {
    const gameId = await this.newId();
    const lobbyId = await this.newId();
    const trx = await this.knexConnection.transaction();

    try {
      await trx('lobbies').insert({
        id: lobbyId,
        max_players: 10,
        version: 0,
      });

      await trx('games').insert({
        id: gameId.toString(),
        created_by_id: account.getId().getValue(),
        lobby_id: lobbyId,
        game_mode: gameMode,
        game_type: gameType,
        version: 0,
      });

      const gameRecord = await trx('games')
        .select('*')
        .where({ id: gameId.toString() })
        .first();

      await trx.commit();

      const lobby: Lobby = this.lobbyFactory.create({
        id: lobbyId.toString(),
        maxPlayers: 10,
        players: [],
      });

      const game: Game = this.gameFactory.create({
        id: gameRecord.id,
        gameType: gameType,
        createdBy: account,
        createdAt: gameRecord.created_at,
        gameMode: gameMode,
        startedAt: new Date(gameRecord.created_at),
        lobby,
      });

      return game;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }
}
