import { ProblemResult } from './problem-result';

export interface ProblemQuery {
  findBySlug: (slug: string) => Promise<ProblemResult>;
}
