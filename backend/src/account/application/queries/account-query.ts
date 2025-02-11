import { Account } from 'src/account/domain/account';
import { Id } from 'src/common/domain/id';
import { PageResult } from 'src/common/pagination/page-result';
import { Problem } from 'src/problem/domain/problem';
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
  getTotalSubmissions(accountId: Id): Promise<number>;
  getTotalSolutions(accountId: Id): Promise<number>;

  getAdminProblems(
    page: number,
    size: number,
    timestamp: Date,
  ): Promise<PageResult<Problem>>;
}
