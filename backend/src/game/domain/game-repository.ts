import { Id } from 'src/common/domain/id';
import { Game } from './game';
import { Problem } from 'src/problem/domain/problem';

export interface GameRepository {
  newId(): Promise<Id>;
  createGame(game: Game): Promise<Game>;
  getHighestDifficulty(): Promise<number>;
  findProblemsInDifficultyRange(low: number, high: number): Promise<Problem[]>;
}
