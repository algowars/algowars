import { GetProblemSetupResult } from './get-problem-setup-query/get-problem-setup.result';

export interface LanguageQuery {
  findSetupById(languageId: number): Promise<GetProblemSetupResult | null>;
}
