import { Problem } from './problem';

export interface ProblemRepository {
  newId(): Promise<string>;
  save(problem: Problem | Problem[]): Promise<void>;
  findBySlug(slug: string): Promise<Problem | null>;
  findById(id: string): Promise<Problem | null>;
}
