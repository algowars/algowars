import { FindProblemBySlugResult } from './find-problem-by-slug-query/find-problem-by-slug-result';

export interface ProblemQuery {
  findBySlug(slug: string): Promise<FindProblemBySlugResult | null>;
}
