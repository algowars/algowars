import { Submission } from 'src/submission/domain/submission';
import { Problem } from './problem';

export interface ProblemRepository {
  newId(): Promise<string>;
  save(submission: Submission | Submission[]): Promise<void>;
  findBySlug(slug: string): Promise<Problem | null>;
  findById(id: string): Promise<Problem | null>;
}
