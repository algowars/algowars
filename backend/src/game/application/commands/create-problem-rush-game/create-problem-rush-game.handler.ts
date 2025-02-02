import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProblemRushGameCommand } from './create-problem-rush-game.command';
import { Id } from 'src/common/domain/id';
import { Inject } from '@nestjs/common';
import { GameInjectionToken } from '../../injection-token';
import { GameRepository } from 'src/game/domain/game-repository';
import { GameType } from 'src/game/domain/game-factory';
import { PlayerCountMatrix } from 'src/game/domain/game-mode-player-count-matrix';
@CommandHandler(CreateProblemRushGameCommand)
export class CreateProblemRushGameHandler
  implements ICommandHandler<CreateProblemRushGameCommand, Id>
{
  @Inject(GameInjectionToken.GAME_REPOSITORY)
  private readonly gameRepository: GameRepository;
  @Inject()
  private readonly playerCountMatrix: PlayerCountMatrix;

  async execute({
    account,
    gameMode,
  }: CreateProblemRushGameCommand): Promise<Id> {
    const game = await this.gameRepository.createGame(
      account,
      gameMode,
      GameType.RUSH,
      this.playerCountMatrix.getPlayerCountFromGameMode(gameMode),
    );
    return game.getId();
  }
}
