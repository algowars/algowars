import { IQueryResult } from '@nestjs/cqrs';
import { GameModes } from 'src/elo/domain/game-mode';
import { SubmissionStatus } from 'src/submission/domain/submission-status';

export class FindProfileInformationResult implements IQueryResult {
  readonly username: string;
  readonly createdAt: Date;
  readonly ranks: {
    gameMode: GameModes;
    elo: number;
  }[];
  readonly recentSubmissions: {
    problemSlug: string;
    problemId: string;
    problemTitle: string;
    status: SubmissionStatus;
    createdAt: Date;
    id: string;
  }[];
}
