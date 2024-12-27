import { Id } from 'src/common/domain/id';
import { Language } from './language';
import { AdditionalTestFile } from './additional-test-file';

export interface LanguageRepository {
  findById(languageId: Id, select?: string): Promise<Language | null>;

  findByIdWithTestFile(
    languageId: Id,
    additionalTestFileId: Id,
  ): Promise<{
    language: Language;
    additionalTestFile: AdditionalTestFile;
  } | null>;
}
