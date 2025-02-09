import { Inject } from '@nestjs/common';
import { Knex } from 'knex';
import { DatabaseInjectionToken } from 'lib/database.module';
import { InjectConnection } from 'nest-knexjs';
import { Id } from 'src/common/domain/id';
import { GameQuery } from 'src/game/application/queries/game-query';
import { Game } from 'src/game/domain/game';
import { GameFactory } from 'src/game/domain/game-factory';
import { LobbyFactory } from 'src/game/domain/lobby-factory';

export class GameQueryImplementation implements GameQuery {
  constructor(
    @InjectConnection(DatabaseInjectionToken.READ_CONNECTION)
    private readonly knexConnection: Knex,
    @Inject()
    private readonly lobbyFactory: LobbyFactory,
    @Inject()
    private readonly gameFactory: GameFactory,
  ) {}

  async findById(id: Id): Promise<Game | null> {
    const gameRecord = await this.knexConnection('games')
      .where({ id: id.toString() })
      .first();

    console.log('R: ', gameRecord);

    if (!gameRecord) {
      return null;
    }

    const lobbyRecord = await this.knexConnection('lobbies')
      .where({ id: gameRecord.lobby_id })
      .first();

    console.log('LOBBY: ', lobbyRecord);

    if (!lobbyRecord) {
      console.error(`Lobby not found for game id ${id.toString()}`);
      return null;
    }

    const lobby = this.lobbyFactory.create({
      id: lobbyRecord.id,
      maxPlayers: lobbyRecord.max_players,
      players: [],
    });

    const createdBy = { id: gameRecord.created_by_id } as any;

    const game = this.gameFactory.create({
      id: gameRecord.id,
      gameType: gameRecord.game_type,
      createdBy,
      gameMode: gameRecord.game_mode,
      lobby,
      createdAt: new Date(gameRecord.created_at),
      updatedAt: new Date(gameRecord.updated_at),
      startedAt: gameRecord.started_at ? new Date(gameRecord.started_at) : null,
    });

    return game;
  }
}
