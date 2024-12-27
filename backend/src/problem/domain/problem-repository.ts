import { Submission } from 'src/submission/domain/submission';
import { Problem } from './problem';
import { ProblemSetup } from './problem-setup';

export interface ProblemRepository {
  newId(): Promise<string>;
  save(problem: Problem | Problem[]): Promise<void>;
  saveAggregate(
    problem: Problem,
    problemSetup: ProblemSetup,
    submission: Submission,
  ): Promise<void>;
  findBySlug(slug: string): Promise<Problem | null>;
  findById(id: string): Promise<Problem | null>;
}
