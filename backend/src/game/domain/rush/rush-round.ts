import { Submission } from 'src/submission/domain/submission';
import { GameRound } from '../game-round';
import { Account } from 'src/account/domain/account';
import { Problem } from 'src/problem/domain/problem';

export interface RushRound {
  finishRound(): void;
  getResults(): any;
  getSubmissionsForAccount(account: Account): Submission[];
  getProblem(): Problem;
  submit(account: Account, submission: Submission): void;
}

export class RushRoundImplementation extends GameRound implements RushRound {
  private readonly problem: Problem;
  private userSubmissions: { account: Account; submissions: Submission[] }[] =
    [];

  constructor(problem: Problem) {
    super();
    this.problem = problem;
  }

  public submit(account: Account, submission: Submission): void {
    let userRecord = this.userSubmissions.find((record) =>
      record.account.getId().equals(account.getId()),
    );
    if (!userRecord) {
      userRecord = { account, submissions: [] };
      this.userSubmissions.push(userRecord);
    }
    userRecord.submissions.push(submission);
  }

  public finishRound(): void {
    console.log('Rush round finished.');
  }

  public getResults(): any {
    return this.userSubmissions.map((record) => ({
      accountId: record.account.getId().toString(),
      submissionCount: record.submissions.length,
    }));
  }

  public getSubmissionsForAccount(account: Account): Submission[] {
    const record = this.userSubmissions.find((rec) =>
      rec.account.getId().equals(account.getId()),
    );
    return record ? record.submissions : [];
  }

  public getProblem(): Problem {
    return this.problem;
  }
}
