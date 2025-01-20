import { ProblemSetup } from './problem-setup';

export interface ProblemSetupRepository {
  findById(problemId: string, languageId: number): Promise<ProblemSetup | null>;
}
