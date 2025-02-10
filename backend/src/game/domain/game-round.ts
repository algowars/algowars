import { Account } from 'src/account/domain/account';
import { Submission } from 'src/submission/domain/submission';

export abstract class GameRound {
  private startedAt: Date;
  private finishedAt?: Date;

  /**
   * Accepts a submission from a player.
   * Implementation details may vary based on the game mode.
   *
   * @param account - The account making the submission.
   * @param submission - The submission content.
   */
  public abstract submit(account: Account, submission: Submission): void;

  /**
   * Marks the round as finished.
   */
  public abstract finishRound(): void;

  /**
   * Returns the results for this round.
   */
  public abstract getResults(): any;
}
