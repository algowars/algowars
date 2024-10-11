import { PageResult } from 'src/common/pagination/page-result';
import { FindProblemBySlugResult } from './find-problem-by-slug-query/find-problem-by-slug-result';
import { GetProblemsPageableResult } from './get-problems-pageable-query/get-problems-pageable-result';

export interface ProblemQuery {
  findBySlug(slug: string): Promise<FindProblemBySlugResult | null>;
  getPageable(
    page: number,
    size: number,
    timestamp: Date,
  ): Promise<PageResult<GetProblemsPageableResult>>;
}
