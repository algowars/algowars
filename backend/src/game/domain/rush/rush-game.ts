// rush-game.ts
import { Account } from 'src/account/domain/account';
import { Game, GameProperties } from '../game';
import { RushRound } from './rush-round';
import { GameType } from '../game-factory';
import { SubmissionStatus } from 'src/submission/domain/submission-status';

export interface RushGameProperties extends GameProperties {
  gameType: GameType;
}

export interface RushGame {
  getRounds(): RushRound[];
  getCurrentRound(account: Account): RushRound;
  addRounds(rounds: RushRound[]): void;
}

export class RushGameImplementation extends Game implements RushGame {
  private rounds: RushRound[] = [];

  constructor(properties: RushGameProperties) {
    super(properties);
  }

  protected onStart(): void {
    console.log('Rush game started.');
  }

  protected onFinish(): void {
    console.log('Rush game finished.');
  }

  getRounds(): RushRound[] {
    return this.rounds;
  }

  addRounds(rounds: RushRound[]): void {
    this.rounds.push(...rounds);
  }

  getCurrentRound(account: Account): RushRound {
    console.log('ROUNDS: ', this.rounds);
    for (const round of this.rounds) {
      const submissions = round.getSubmissionsForAccount(account);
      const hasAccepted = submissions.some(
        (submission) =>
          submission.getAggregateStatus() === SubmissionStatus.ACCEPTED,
      );
      if (!hasAccepted) {
        return round;
      }
    }
    return this.rounds[this.rounds.length - 1];
  }
}
