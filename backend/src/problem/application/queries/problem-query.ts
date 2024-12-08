import { PageResult } from 'src/common/pagination/page-result';
import { FindProblemBySlugResult } from './find-problem-by-slug-query/find-problem-by-slug-result';
import { GetProblemsPageableResult } from './get-problems-pageable-query/get-problems-pageable-result';
import { Account } from 'src/account/domain/account';
import { GetProblemSolutionsResult } from './get-problem-solutions-query/get-problem-solutions.result';
import { GetProblemWithStatusesResult } from './get-problem-with-statuses/get-problem-with-statuses-result';

export interface ProblemQuery {
  findBySlug(
    slug: string,
    languageId?: number,
  ): Promise<FindProblemBySlugResult | null>;

  getPageable(
    page: number,
    size: number,
    timestamp: Date,
  ): Promise<PageResult<GetProblemsPageableResult>>;

  findBySlugWithSolutions(
    slug: string,
    account: Account,
  ): Promise<GetProblemSolutionsResult | null>;

  getAsAdmin(
    page: number,
    size: number,
    timestamp: Date,
  ): Promise<PageResult<GetProblemWithStatusesResult>>;
}
