import { ProblemStatus } from './problem-status';

export interface ProblemStatusRepository {
  findById(id: number): Promise<ProblemStatus | null>;
}
