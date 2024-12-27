import { Id } from 'src/common/domain/id';
import { AdditionalTestFile } from 'src/problem/domain/additional-test-file';
import { Language } from 'src/problem/domain/language';

export interface LanguageQuery {
  findById(languageId: number): Promise<Language | null>;

  findByIdWithTestFiles(languageId: Id): Promise<{
    language: Language;
    additionalTestFiles: AdditionalTestFile[];
  } | null>;

  findByIdWithTestFile(
    languageId: Id,
    additionalTestFileId: Id,
  ): Promise<{
    language: Language;
    additionalTestFile: AdditionalTestFile;
  } | null>;
}
