import { Knex } from 'knex';
import { DatabaseInjectionToken } from 'lib/database.module';
import { InjectConnection } from 'nest-knexjs';
import { Aliases } from 'src/db/aliases';
import {
  ProblemSetup,
  ProblemSetupImplementation,
} from 'src/problem/domain/problem-setup';
import { ProblemSetupRepository } from 'src/problem/domain/problem-setup-repository';
import { LanguageImplementation } from 'src/problem/domain/language';
import { TestImplementation } from 'src/problem/domain/test';
import { ProblemImplementation } from 'src/problem/domain/problem';
import { IdImplementation } from 'src/common/domain/id';
import { AdditionalTestFileImplementation } from 'src/problem/domain/additional-test-file';

export class ProblemSetupRepositoryImplementation
  implements ProblemSetupRepository
{
  constructor(
    @InjectConnection(DatabaseInjectionToken.WRITE_CONNECTION)
    private readonly knexConnection: Knex,
  ) {}

  async findById(
    problemId: string,
    languageId: number,
  ): Promise<ProblemSetup | null> {
    const problemSetup = await this.knexConnection
      .from(`${Aliases.PROBLEM_SETUPS} as ps`)
      .select(
        'ps.initial_code',
        'p.id as problem_id',
        'p.title',
        'p.slug',
        'p.question',
        'p.status',
        'p.created_by_id',
        'p.created_at as problem_created_at',
        'p.updated_at as problem_updated_at',
        'l.id as language_id',
        'l.name as language_name',
        'l.is_archived',
        'l.is_available',
        'l.initial_code as language_initial_code',
        'l.initial_solution as language_initial_solution',
        'l.created_at as language_created_at',
        'l.updated_at as language_updated_at',
      )
      .leftJoin('problems as p', 'ps.problem_id', 'p.id')
      .leftJoin('languages as l', 'ps.language_id', 'l.id')
      .where({ 'ps.problem_id': problemId, 'ps.language_id': languageId })
      .first();

    if (!problemSetup) {
      return null;
    }

    const tests = await this.knexConnection
      .from('tests as t')
      .select(
        't.id as test_id',
        't.code',
        't.input',
        't.expected_output',
        't.created_at as test_created_at',
        't.updated_at as test_updated_at',
        't.test_type',
        'atf.id as additional_test_file_id',
        'atf.file_name as additional_test_file_name',
        'atf.name as additional_test_file_display_name',
        'atf.initial_test_file as additional_test_file_content',
        'atf.language_id as additional_test_file_language_id',
        'atf.created_at as additional_test_file_created_at',
        'atf.updated_at as additional_test_file_updated_at',
      )
      .leftJoin(
        'additional_test_files as atf',
        't.additional_test_file_id',
        'atf.id',
      )
      .where({ 't.problem_id': problemId, 't.language_id': languageId });

    const problem = new ProblemImplementation({
      id: new IdImplementation(problemSetup.problem_id),
      title: problemSetup.title,
      slug: problemSetup.slug,
      question: problemSetup.question,
      status: problemSetup.status,
      createdBy: problemSetup.created_by_id,
      createdAt: problemSetup.problem_created_at,
      updatedAt: problemSetup.problem_updated_at,
    });

    const language = new LanguageImplementation({
      id: new IdImplementation(problemSetup.language_id),
      name: problemSetup.language_name,
      isArchived: problemSetup.is_archived,
      isAvailable: problemSetup.is_available,
      initialCode: problemSetup.language_initial_code,
      initialSolution: problemSetup.language_initial_solution,
      createdAt: problemSetup.language_created_at,
      updatedAt: problemSetup.language_updated_at,
    });

    const testEntities = tests.map((test) => {
      const additionalTestFile = test.additional_test_file_id
        ? new AdditionalTestFileImplementation({
            id: new IdImplementation(test.additional_test_file_id),
            fileName: test.additional_test_file_name,
            name: test.additional_test_file_display_name,
            initialTestFile: test.additional_test_file_content,
            createdAt: test.additional_test_file_created_at,
            updatedAt: test.additional_test_file_updated_at,
          })
        : null;

      return new TestImplementation({
        id: new IdImplementation(test.test_id),
        code: test.code,
        input: test.input ?? null,
        expectedOutput: test.expected_output ?? null,
        additionalTestFile,
        createdAt: test.test_created_at,
        updatedAt: test.test_updated_at,
        testType: test.test_type,
      });
    });

    return new ProblemSetupImplementation({
      id: problemSetup.problem_id,
      problem,
      language,
      initialCode: problemSetup.initial_code,
      tests: testEntities,
      createdAt: problemSetup.problem_created_at,
      updatedAt: problemSetup.problem_updated_at,
    });
  }
}
