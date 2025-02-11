import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindRushByIdQuery } from './find-rush-by-id.query';
import { FindRushByIdResult } from './find-rush-by-id-result';
import { Inject, NotFoundException } from '@nestjs/common';
import { GameInjectionToken } from '../../injection-token';
import { GameQuery } from '../game-query';
import { GameErrorMessage } from 'src/game/domain/game-error-message';
import { IdImplementation } from 'src/common/domain/id';
import { RushGame } from 'src/game/domain/rush/rush-game';
import { ProblemErrorMessage } from 'src/problem/domain/problem-error-message';
import { ProblemInjectionToken } from 'src/problem/application/injection-token';
import { ProblemQuery } from 'src/problem/application/queries/problem-query';

@QueryHandler(FindRushByIdQuery)
export class FindRushByIdHandler
  implements IQueryHandler<FindRushByIdQuery, FindRushByIdResult>
{
  @Inject(GameInjectionToken.GAME_QUERY)
  readonly gameQuery: GameQuery;

  @Inject(ProblemInjectionToken.PROBLEM_QUERY)
  readonly problemQuery: ProblemQuery;

  async execute(query: FindRushByIdQuery): Promise<FindRushByIdResult> {
    const game = await this.gameQuery.findById(new IdImplementation(query.id));
    if (!game) {
      throw new NotFoundException(GameErrorMessage.GAME_NOT_FOUND);
    }

    const rushGame = game as unknown as RushGame;
    const currentRound = rushGame.getCurrentRound(query.account);
    if (!currentRound) {
      throw new NotFoundException('Current round not found');
    }

    const rounds = rushGame.getRounds();
    const roundIndex = rounds.indexOf(currentRound);

    const problem = currentRound.getProblem();
    if (!problem) {
      throw new NotFoundException('Problem not found in the current round');
    }

    const setup = await this.problemQuery.findSetup(
      problem.getId().toString(),
      query.languageId,
    );
    if (!setup) {
      throw new NotFoundException(ProblemErrorMessage.SETUP_NOT_FOUND);
    }

    return {
      id: problem.getId().toString(),
      title: problem.getTitle(),
      slug: problem.getSlug(),
      initialCode: setup.getInitialCode(),
      question: problem.getQuestion(),
      createdAt: problem.getCreatedAt(),
      createdBy: {
        username: problem.getCreatedBy()?.getUsername().toString() ?? '',
        id: problem.getCreatedBy()?.getId().toString() ?? '',
      },
      tags: problem.getTags()?.map((tag) => tag.getName()),
      difficulty: problem.getDifficulty(),
      roundIndex,
    };
  }
}
