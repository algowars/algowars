import { Inject } from '@nestjs/common';
import { Knex } from 'knex';
import { DatabaseInjectionToken } from 'lib/database.module';
import { InjectConnection } from 'nest-knexjs';
import { AccountFactory } from 'src/account/domain/account-factory';
import { Id } from 'src/common/domain/id';
import { GameQuery } from 'src/game/application/queries/game-query';
import { Game } from 'src/game/domain/game';
import { GameFactory } from 'src/game/domain/game-factory';
import { LobbyFactory } from 'src/game/domain/lobby-factory';
import { RushRoundImplementation } from 'src/game/domain/rush/rush-round';
import { ProblemFactory } from 'src/problem/domain/problem-factory';

export class GameQueryImplementation implements GameQuery {
  constructor(
    @InjectConnection(DatabaseInjectionToken.READ_CONNECTION)
    private readonly knexConnection: Knex,
    @Inject()
    private readonly lobbyFactory: LobbyFactory,
    @Inject()
    private readonly gameFactory: GameFactory,
    @Inject()
    private readonly problemFactory: ProblemFactory,
    @Inject()
    private readonly accountFactory: AccountFactory,
  ) {}

  async findById(id: Id): Promise<Game | null> {
    const gameRecord = await this.knexConnection('games')
      .where({ id: id.toString() })
      .first();

    if (!gameRecord) {
      return null;
    }

    const lobbyRecord = await this.knexConnection('lobbies')
      .where({ id: gameRecord.lobby_id })
      .first();

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

    const roundRecords = await this.knexConnection('game_rounds as gr')
      .join('problems as p', 'gr.problem_id', 'p.id')
      .join('accounts as a', 'p.created_by_id', 'a.id')
      .select(
        'gr.id as round_id',
        'gr.created_at as round_created_at',
        'gr.updated_at as round_updated_at',
        'gr.version as round_version',
        'p.id as problem_id',
        'p.title',
        'p.slug',
        'p.question',
        'p.status',
        'p.difficulty',
        'p.created_at as problem_created_at',
        'p.updated_at as problem_updated_at',
        'p.deleted_at as problem_deleted_at',
        'p.version as problem_version',
        'a.id as account_id',
        'a.username as account_username',
      )
      .where('gr.game_id', gameRecord.id);

    const rounds = roundRecords.map((row) => {
      const problem = this.problemFactory.create({
        id: row.problem_id,
        title: row.title,
        slug: row.slug,
        question: row.question,
        createdBy: this.accountFactory.create({
          id: row.account_id,
          username: row.account_username,
        }),
        status: row.status,
        createdAt: new Date(row.problem_created_at),
        updatedAt: new Date(row.problem_updated_at),
        deletedAt: row.problem_deleted_at
          ? new Date(row.problem_deleted_at)
          : null,
        version: row.problem_version,
        difficulty: row.difficulty,
      });
      const rushRound = new RushRoundImplementation(problem);

      return rushRound;
    });

    if (typeof (game as any).addRounds === 'function') {
      (game as any).addRounds(rounds);
    } else {
      (game as any).rounds = rounds;
    }

    return game;
  }
}
