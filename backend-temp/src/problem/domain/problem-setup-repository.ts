import { ProblemSetup } from './problem-setup';

export interface ProblemSetupRepository {
  findByProblemSlug(
    slug: string,
    languageId: number,
  ): Promise<ProblemSetup | null>;
}
