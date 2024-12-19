import { Injectable } from '@nestjs/common';
import { readConnection } from 'lib/database.module';
import { GetProblemSetupResult } from 'src/problem/application/queries/get-problem-setup-query/get-problem-setup.result';
import { LanguageQuery } from 'src/problem/application/queries/language-query';
import { LanguageEntity } from '../entities/language.entity';

@Injectable()
export class LanguageQueryImplementation implements LanguageQuery {
  async findSetupById(id: number): Promise<GetProblemSetupResult | null> {
    const languageEntity = await readConnection
      .getRepository(LanguageEntity)
      .createQueryBuilder('language')
      .leftJoinAndSelect(
        'language.additionalTestFiles',
        'additionalTestFiles',
        'additionalTestFiles.languageId = language.id',
      )
      .select([
        'language.initialCode',
        'language.initialSolution',
        'additionalTestFiles.id',
        'additionalTestFiles.fileName',
        'additionalTestFiles.name',
        'additionalTestFiles.initialTestFile',
      ])
      .where('language.id = :id', { id })
      .getOne();

    if (!languageEntity) {
      return null;
    }

    return this.mapLanguageToProblemSetupResult(languageEntity);
  }

  private mapLanguageToProblemSetupResult(
    language: LanguageEntity,
  ): GetProblemSetupResult {
    const additionalTestFiles = language.additionalTestFiles
      ? language.additionalTestFiles
      : [];

    const testFile =
      additionalTestFiles.length > 0
        ? additionalTestFiles[0].initialTestFile
        : null;

    return {
      initialCode: language.initialCode,
      initialSolution: language.initialSolution,
      testFile: testFile || '',
      additionalTestFiles: Array.isArray(additionalTestFiles)
        ? additionalTestFiles.map(({ id, name }) => ({
            id,
            name,
          }))
        : [],
    };
  }
}
