import {
  BaseDomainAggregateRoot,
  BaseDomainAggregateRootImplementation,
  BaseDomainProperties,
} from 'src/common/entities/base-domain';
import { ProblemRushGameMode } from './problem-rush-game-mode';
import { Account } from 'src/account/domain/account';
import { RushProblem } from './rush-problem';
import { ProblemRushStatus } from './problem-rush-status';

export interface GameRushProperties extends BaseDomainProperties {
  gameMode?: ProblemRushGameMode;
  problems: RushProblem[];
  createBy?: Account;
  gameStatus?: ProblemRushStatus;
  startedAt?: Date;
}

export interface IGameRush extends BaseDomainAggregateRoot {
  getGameMode(): ProblemRushGameMode;
  getCreatedBy(): Account;
  getProblems(): RushProblem[];
  getGameStatus(): ProblemRushStatus;
  getStartedAt(): Date;
  startGame(): void;
}

export class ProblemRush
  extends BaseDomainAggregateRootImplementation
  implements IGameRush
{
  private readonly gameMode: ProblemRushGameMode;
  private readonly createdBy: Account;
  private readonly problems: RushProblem[];
  private readonly gameStatus: ProblemRushStatus;
  private startedAt: Date;

  constructor(properties: GameRushProperties) {
    super(properties);
    Object.assign(this, properties);
  }

  getProblems(): RushProblem[] {
    return this.problems;
  }

  getGameStatus(): ProblemRushStatus {
    return this.gameStatus;
  }

  getCreatedBy(): Account {
    return this.createdBy;
  }

  getGameMode(): ProblemRushGameMode {
    return this.gameMode;
  }

  getStartedAt(): Date {
    return this.startedAt;
  }

  startGame(): void {
    if (this.startedAt) {
      throw new Error('Game has already started');
    }

    this.startedAt = new Date();
  }
}
