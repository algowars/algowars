import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindRushByIdQuery } from './find-rush-by-id.query';
import { FindRushByIdResult } from './find-rush-by-id-result';
import { Inject, NotFoundException } from '@nestjs/common';
import { GameInjectionToken } from '../../injection-token';
import { GameQuery } from '../game-query';
import { GameErrorMessage } from 'src/game/domain/game-error-message';
import { IdImplementation } from 'src/common/domain/id';

@QueryHandler(FindRushByIdQuery)
export class FindRushByIdHandler
  implements IQueryHandler<FindRushByIdQuery, FindRushByIdResult>
{
  @Inject(GameInjectionToken.GAME_QUERY)
  readonly gameQuery: GameQuery;

  async execute(query: FindRushByIdQuery): Promise<FindRushByIdResult> {
    const game = await this.gameQuery.findById(new IdImplementation(query.id));

    console.log('GAME: ', game);

    if (!game) {
      throw new NotFoundException(GameErrorMessage.GAME_NOT_FOUND);
    }

    return {
      id: game.getId().toString(),
      gameMode: game.getGameMode(),
      createdAt: game.getCreatedAt(),
      finishedAt: game.getFinishedAt(),
    };
  }
}
