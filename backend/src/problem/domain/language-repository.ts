import { Language } from './language';

export interface LanguageRepository {
  findById(id: number): Promise<Language | null>;
  findByIdWithAdditionalTestFile(
    id: number,
    additionalTestFileId: number,
  ): Promise<Language | null>;
  findByName(name: string): Promise<Language | null>;
}
