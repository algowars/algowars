import { IQueryResult } from '@nestjs/cqrs';
import { GameModes } from 'src/elo/domain/game-mode';

export class FindProfileInformationResult implements IQueryResult {
  readonly username: string;
  readonly createdAt: Date;
  readonly ranks: {
    gameMode: GameModes;
    elo: number;
  }[];
}
