import { Submission } from 'src/submission/domain/submission';
import { GameRound } from '../game-round';
import { Account } from 'src/account/domain/account';

export interface RushRound {}

export class RushRoundImplementation extends GameRound implements RushRound {
  private userSubmissions: {
    account: Account;
    submissions: Submission[];
  }[] = [];

  public submit(account: Account, submission: string): void {
    // TODO: Add submission logic, e.g., find if the user already exists and append, or add a new record.
    console.log(
      `Submission received from ${account.getId().toString()}: ${submission}`,
    );
    // Example implementation:
    let userRecord = this.userSubmissions.find((record) =>
      record.account.getId().equals(account.getId()),
    );
    if (!userRecord) {
      userRecord = { account, submissions: [] };
      this.userSubmissions.push(userRecord);
    }
    // Here, you might want to create a Submission instance from the string if needed.
    // For now, we simply push the string (or a dummy submission object) into the array.
    // userRecord.submissions.push(new Submission(submission));
  }

  public finishRound(): void {
    // TODO: Mark the round as finished, maybe capture a finish timestamp or process submissions.
    console.log('Rush round finished.');
  }

  public getResults() {
    // TODO: Compute and return the results for the round.
    console.log('Computing results for the round.');
    return this.userSubmissions.map((record) => ({
      accountId: record.account.getId().toString(),
      submissionCount: record.submissions.length,
    }));
  }
}
