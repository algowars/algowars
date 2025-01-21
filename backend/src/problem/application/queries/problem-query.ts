import { Id } from 'src/common/domain/id';
import { PageResult } from 'src/common/pagination/page-result';
import { Problem } from 'src/problem/domain/problem';
import { ProblemSetup } from 'src/problem/domain/problem-setup';
import { Submission } from 'src/submission/domain/submission';

export interface ProblemQuery {
  findBySlug(slug: string, select?: string): Promise<Problem | null>;

  getPageable(
    page: number,
    size: number,
    timestamp: Date,
  ): Promise<PageResult<Problem>>;

  getSolutions(problemId: Id): Promise<Submission[]>;

  findSetup(
    problemId: string,
    languageId: number,
  ): Promise<ProblemSetup | null>;

  getProblemWithinRange(
    minDifficulty: number,
    maxDifficulty: number,
  ): Promise<Problem | null>;

  getTotalProblems(): Promise<number>;

  getHighestRatedProblem(): Promise<Problem>;
}
