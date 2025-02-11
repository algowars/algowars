import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProblemRushGameCommand } from './create-problem-rush-game.command';
import { Id } from 'src/common/domain/id';
import { Inject } from '@nestjs/common';
import { GameInjectionToken } from '../../injection-token';
import { GameRepository } from 'src/game/domain/game-repository';
import { PlayerCountMatrix } from 'src/game/domain/game-mode-player-count-matrix';
import { GameRoundBuilder } from 'src/game/domain/game-round-builder';
import { RushGameImplementation } from 'src/game/domain/rush/rush-game';
import { LobbyFactory } from 'src/game/domain/lobby-factory';
import { RushRound } from 'src/game/domain/rush/rush-round';
import { GameType } from 'src/game/domain/game-factory';

@CommandHandler(CreateProblemRushGameCommand)
export class CreateProblemRushGameHandler
  implements ICommandHandler<CreateProblemRushGameCommand, Id>
{
  @Inject(GameInjectionToken.GAME_REPOSITORY)
  private readonly gameRepository: GameRepository;

  @Inject()
  private readonly playerCountMatrix: PlayerCountMatrix;

  @Inject(GameInjectionToken.GAME_ROUND_BUILDER)
  private readonly gameRoundBuilder: GameRoundBuilder;

  @Inject()
  private readonly lobbyFactory: LobbyFactory;

  async execute({
    account,
    gameMode,
  }: CreateProblemRushGameCommand): Promise<Id> {
    const gameId = await this.gameRepository.newId();
    const maxPlayers =
      this.playerCountMatrix.getPlayerCountFromGameMode(gameMode);
    const lobby = this.lobbyFactory.create({
      id: await this.gameRepository.newId(),
      maxPlayers,
      players: [],
    });
    const game = new RushGameImplementation({
      id: gameId,
      createdBy: account,
      gameMode,
      lobby,
      createdAt: new Date(),
      gameType: GameType.RUSH,
    });
    const rounds = await this.gameRoundBuilder.buildRounds(100, 150);
    // Convert rounds to RushRound[] if necessary.
    const firstFiveRounds = rounds.slice(0, 5) as unknown as RushRound[];
    game.addRounds(firstFiveRounds);
    const persistedGame = await this.gameRepository.createGame(game);
    return persistedGame.getId();
  }
}
