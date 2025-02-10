import { Inject } from '@nestjs/common';
import { Knex } from 'knex';
import { DatabaseInjectionToken, EntityId } from 'lib/database.module';
import { InjectConnection } from 'nest-knexjs';
import { AccountFactory } from 'src/account/domain/account-factory';
import { Id, IdImplementation } from 'src/common/domain/id';
import { Game } from 'src/game/domain/game';
import { GameFactory } from 'src/game/domain/game-factory';
import { GameRepository } from 'src/game/domain/game-repository';
import { LobbyFactory } from 'src/game/domain/lobby-factory';
import { Problem } from 'src/problem/domain/problem';
import { ProblemFactory } from 'src/problem/domain/problem-factory';

export class GameRepositoryImplementation implements GameRepository {
  constructor(
    @InjectConnection(DatabaseInjectionToken.WRITE_CONNECTION)
    private readonly knexConnection: Knex,
    @Inject() private readonly lobbyFactory: LobbyFactory,
    @Inject() private readonly gameFactory: GameFactory,
    @Inject() private readonly problemFactory: ProblemFactory,
    @Inject() private readonly accountFactory: AccountFactory,
  ) {}

  async newId(): Promise<Id> {
    return new IdImplementation(new EntityId().toString());
  }

  async createGame(game: Game): Promise<Game> {
    return this.knexConnection.transaction(async (trx) => {
      const lobbyId = game.getLobby().getId().toString();
      await trx('lobbies').insert({
        id: lobbyId,
        max_players: game.getLobby().getMaxPlayers(),
      });
      await trx('lobby_players').insert({
        lobby_id: lobbyId,
        account_id: game.getCreatedBy().getId().toString(),
      });
      await trx('games').insert({
        id: game.getId().toString(),
        created_by_id: game.getCreatedBy().getId().toString(),
        lobby_id: lobbyId,
        game_mode: game.getGameMode(),
        game_type: game.getGameType(),
        created_at: game.getCreatedAt(),
        finished_at: game.getFinishedAt() || null,
      });
      if (typeof (game as any).getRounds === 'function') {
        const rounds = (game as any).getRounds();
        for (const round of rounds) {
          const roundId = await this.newId();
          await trx('game_rounds').insert({
            id: roundId.toString(),
            game_id: game.getId().toString(),
            problem_id: round.getProblem().getId().toString(),
            version: 0,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
          });
        }
      }
      return game;
    });
  }

  async getHighestDifficulty(): Promise<number> {
    const result = await this.knexConnection('problems')
      .max('difficulty as maxDifficulty')
      .first();
    if (!result || result.maxDifficulty === null) {
      throw new Error('No problems found in the repository.');
    }
    return Number(result.maxDifficulty);
  }

  async findProblemsInDifficultyRange(
    low: number,
    high: number,
  ): Promise<Problem[]> {
    const rows = await this.knexConnection('problems as p')
      .join('accounts as a', 'p.created_by_id', 'a.id')
      .select('p.*', 'a.id as account_id', 'a.username as account_username')
      .where('p.difficulty', '>=', low)
      .andWhere('p.difficulty', '<=', high);
    return rows.map((row) =>
      this.problemFactory.create({
        id: row.id,
        title: row.title,
        slug: row.slug,
        question: row.question,
        createdBy: this.accountFactory.create({
          id: new IdImplementation(row.account_id),
          username: row.account_username,
        }),
        status: row.status,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
        deletedAt: row.deleted_at ? new Date(row.deleted_at) : null,
        version: row.version,
      }),
    );
  }
}
