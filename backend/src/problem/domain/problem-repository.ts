import { Problem } from './problem';

export interface ProblemRepository {
  newId: () => Promise<string>;
  save: (problem: Problem | Problem[]) => Promise<void>;
  findById: (id: string) => Promise<Problem | null>;
}
