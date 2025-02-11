import { Inject, Injectable } from '@nestjs/common';
import { GameRound } from './game-round';
import { GameInjectionToken } from '../application/injection-token';
import { GameRepository } from './game-repository';
import { Problem } from 'src/problem/domain/problem';
import { RushRoundImplementation } from './rush/rush-round';

export interface GameRoundBuilder {
  buildRounds(range: number, stepCount: number): Promise<GameRound[]>;
}

@Injectable()
export class GameRoundBuilderImplementation implements GameRoundBuilder {
  constructor(
    @Inject(GameInjectionToken.GAME_REPOSITORY)
    private readonly gameRepository: GameRepository,
  ) {}

  async buildRounds(range: number, stepCount: number): Promise<GameRound[]> {
    const rounds: GameRound[] = [];
    const highestDifficulty: number =
      await this.gameRepository.getHighestDifficulty();
    let center: number = stepCount;
    while (center - range / 2 <= highestDifficulty) {
      const lowerBound: number = center - range / 2;
      const upperBound: number = center + range / 2;
      const problems: Problem[] =
        await this.gameRepository.findProblemsInDifficultyRange(
          lowerBound,
          upperBound,
        );
      if (problems && problems.length > 0) {
        const randomIndex = Math.floor(Math.random() * problems.length);
        const selectedProblem: Problem = problems[randomIndex];
        const round: GameRound = new RushRoundImplementation(selectedProblem);
        rounds.push(round);
      }
      center += stepCount;
    }
    return rounds;
  }
}
