import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProblemRushGameCommand } from './create-problem-rush-game.command';
import { Id } from 'src/common/domain/id';
import { Inject } from '@nestjs/common';
import { GameInjectionToken } from '../../injection-token';
import { IGameRepository } from 'src/game/domain_old/game-repository';

@CommandHandler(CreateProblemRushGameCommand)
export class CreateProblemRushGameHandler
  implements ICommandHandler<CreateProblemRushGameCommand, Id>
{
  @Inject(GameInjectionToken.GAME_REPOSITORY)
  private readonly gameRepository: IGameRepository;

  execute(command: CreateProblemRushGameCommand): Promise<Id> {
    throw new Error('Method not implemented.');
  }
}
