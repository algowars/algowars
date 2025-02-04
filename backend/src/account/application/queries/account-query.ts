import { Account } from 'src/account/domain/account';
import { Id } from 'src/common/domain/id';
import { SubmissionStatus } from 'src/submission/domain/submission-status';

export interface AccountQuery {
  findBySub(sub: string): Promise<Account | null>;
  findByUsername(username: string): Promise<Account | null>;
  findRecentSubmissions(
    accountId: Id,
    limit?: number,
  ): Promise<
    {
      problemSlug: string;
      problemId: string;
      problemTitle: string;
      status: SubmissionStatus | null;
      createdAt: Date;
      id: string;
    }[]
  >;
}
