import { PageResult } from 'src/common/pagination/page-result';
import { Problem } from 'src/problem/domain/problem';
import { ProblemSetup } from 'src/problem/domain/problem-setup';

export interface ProblemQuery {
  findBySlug(slug: string, select?: string): Promise<Problem | null>;

  getPageable(
    page: number,
    size: number,
    timestamp: Date,
  ): Promise<PageResult<Problem>>;

  findSetup(
    problemId: string,
    languageId: number,
  ): Promise<ProblemSetup | null>;
}
