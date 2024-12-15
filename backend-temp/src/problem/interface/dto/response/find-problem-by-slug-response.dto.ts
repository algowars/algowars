import { FindProblemBySlugResult } from 'src/problem/application/queries/find-problem-by-slug-query/find-problem-by-slug-result';

export class FindProblemBySlugResponseDto extends FindProblemBySlugResult {
  readonly id: string;

  readonly title: string;

  readonly question: string;

  readonly slug: string;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  readonly deletedAt: Date;

  readonly createdBy: string;
}
