import { Inject } from '@nestjs/common';
import { Knex } from 'knex';
import { DatabaseInjectionToken } from 'lib/database.module';
import { Id, IdImplementation } from 'src/common/domain/id';
import { Aliases } from 'src/db/aliases';
import {
  AdditionalTestFile,
  AdditionalTestFileImplementation,
  AdditionalTestFileProperties,
} from 'src/problem/domain/additional-test-file';
import {
  Language,
  LanguageImplementation,
  LanguageProperties,
} from 'src/problem/domain/language';
import { LanguageRepository } from 'src/problem/domain/language-repository';
import { LanguageEntity } from '../entities/language.entity';

export class LanguageRepositoryImplementation implements LanguageRepository {
  constructor(
    @Inject(DatabaseInjectionToken.WRITE_CONNECTION)
    private readonly knexConnection: Knex,
  ) {}

  async findById(languageId: Id, select = '*'): Promise<Language | null> {
    const entity = await this.knexConnection(Aliases.LANGUAGES)
      .select<LanguageEntity>(select)
      .where({ id: languageId.getValue() })
      .first();

    if (!entity) {
      return null;
    }

    return new LanguageImplementation({
      id: new IdImplementation(entity.id),
      name: entity.name,
      isArchived: entity.is_archived,
      isAvailable: entity.is_available,
      initialCode: entity.initial_code,
      initialSolution: entity.initial_solution,
      createdAt: entity.created_at,
      updatedAt: entity.updated_at,
      deletedAt: entity.deleted_at || null,
      version: entity.version,
    });
  }

  async findByIdWithTestFile(
    languageId: Id,
    additionalTestFileId: Id,
  ): Promise<{
    language: Language;
    additionalTestFile: AdditionalTestFile;
  } | null> {
    const results = await this.knexConnection(Aliases.LANGUAGES)
      .leftJoin(
        'additional_test_files',
        `${Aliases.LANGUAGES}.id`,
        `${Aliases.ADDITIONAL_TEST_FILES}.language_id`,
      )
      .select(
        'languages.*',
        'additional_test_files.id as test_file_id',
        'additional_test_files.file_name as test_file_name',
        'additional_test_files.name as test_file_name_alias',
        'additional_test_files.initial_test_file as initial_test_file',
      )
      .where(`${Aliases.LANGUAGES}.id`, languageId.toNumber());

    if (results.length === 0) {
      return null;
    }

    const languageProperties: LanguageProperties = {
      id: new IdImplementation(results[0].id),
      createdAt: results[0].created_at,
      updatedAt: results[0].updated_at,
      deletedAt: results[0].deleted_at,
      version: results[0].version,
      name: results[0].name,
      isArchived: results[0].is_archived,
      isAvailable: results[0].is_available,
      initialCode: results[0].initial_code,
      initialSolution: results[0].initial_solution,
    };

    const language = new LanguageImplementation(languageProperties);

    const additionalTestFiles = results
      .filter((row) => row.test_file_id)
      .map((row) => {
        const additionalTestFileProperties: AdditionalTestFileProperties = {
          id: new IdImplementation(row.test_file_id),
          createdAt: row.created_at,
          updatedAt: row.updated_at,
          deletedAt: row.deleted_at,
          version: row.version,
          fileName: row.test_file_name,
          name: row.test_file_name_alias,
          initialTestFile: row.initial_test_file,
        };

        return new AdditionalTestFileImplementation(
          additionalTestFileProperties,
        );
      });

    const selectedTestFile = additionalTestFiles.find((file) =>
      file.getId().equals(additionalTestFileId),
    );

    if (!selectedTestFile) {
      return null;
    }

    return {
      language,
      additionalTestFile: selectedTestFile,
    };
  }
}
