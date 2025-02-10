import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindRushByIdQuery } from './find-rush-by-id.query';
import { FindRushByIdResult } from './find-rush-by-id-result';
import { Inject, NotFoundException } from '@nestjs/common';
import { GameInjectionToken } from '../../injection-token';
import { GameQuery } from '../game-query';
import { GameErrorMessage } from 'src/game/domain/game-error-message';
import { IdImplementation } from 'src/common/domain/id';
import { RushGame } from 'src/game/domain/rush/rush-game';

@QueryHandler(FindRushByIdQuery)
export class FindRushByIdHandler
  implements IQueryHandler<FindRushByIdQuery, FindRushByIdResult>
{
  @Inject(GameInjectionToken.GAME_QUERY)
  readonly gameQuery: GameQuery;

  async execute(query: FindRushByIdQuery): Promise<FindRushByIdResult> {
    const game = await this.gameQuery.findById(new IdImplementation(query.id));

    if (!game) {
      throw new NotFoundException(GameErrorMessage.GAME_NOT_FOUND);
    }

    const rushGame = game as unknown as RushGame;
    const currentRound = rushGame.getCurrentRound(query.account);

    let submissionCount = 0;
    if (
      currentRound &&
      typeof (currentRound as any).getSubmissionsForAccount === 'function'
    ) {
      const submissions = (currentRound as any).getSubmissionsForAccount(
        query.account,
      );
      submissionCount = submissions.length;
    }

    const rounds = rushGame.getRounds();
    const roundIndex = rounds.indexOf(currentRound);

    return {
      id: game.getId().toString(),
      gameMode: game.getGameMode(),
      createdAt: game.getCreatedAt(),
      finishedAt: game.getFinishedAt(),
      currentRound: {
        roundIndex,
        submissionCount,
      },
    };
  }
}
