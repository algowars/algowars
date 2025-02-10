import { IQueryResult } from '@nestjs/cqrs';
import { GameMode } from 'src/game/domain/game-mode';

export class FindRushByIdResult implements IQueryResult {
  id: string;
  gameMode: GameMode;
  createdAt: Date;
  finishedAt?: Date | null;
  currentRound: {
    roundIndex: number;
    submissionCount: number;
  };
}
