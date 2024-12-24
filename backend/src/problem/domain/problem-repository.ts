import { Problem } from './problem';

export interface ProblemRepository {
  newId(): Promise<string>;
  save(submission: Problem | Problem[]): Promise<void>;
  findBySlug(slug: string): Promise<Problem | null>;
  findById(id: string): Promise<Problem | null>;
}
