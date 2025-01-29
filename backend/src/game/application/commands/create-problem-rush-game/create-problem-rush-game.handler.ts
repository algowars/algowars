import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProblemRushGameCommand } from './create-problem-rush-game.command';
import { Id } from 'src/common/domain/id';
import { Inject } from '@nestjs/common';
import { GameInjectionToken } from '../../injection-token';

@CommandHandler(CreateProblemRushGameCommand)
export class CreateProblemRushGameHandler
  implements ICommandHandler<CreateProblemRushGameCommand, Id>
{
  @Inject(GameInjectionToken.GAME_REPOSITORY)
  private readonly gameRepository: GameRepository;
}
