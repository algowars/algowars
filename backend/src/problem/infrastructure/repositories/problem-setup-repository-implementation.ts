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
      .select('ps.initial_code', 'p.*', 'l.*')
      .leftJoin('problems as p', 'ps.problem_id', 'p.id')
      .leftJoin('languages as l', 'ps.language_id', 'l.id')
      .where({ 'ps.problem_id': problemId, 'ps.language_id': languageId })
      .first();

    if (!problemSetup) {
      return null;
    }

    const tests = await this.knexConnection
      .from('tests')
      .where({ problem_id: problemId, language_id: languageId });

    const problem = new ProblemImplementation({
      id: problemSetup.id,
      title: problemSetup.title,
      slug: problemSetup.slug,
      question: problemSetup.question,
      status: problemSetup.status,
      createdBy: problemSetup.created_by_id,
      createdAt: problemSetup.created_at,
      updatedAt: problemSetup.updated_at,
    });

    const language = new LanguageImplementation({
      id: problemSetup.language_id,
      name: problemSetup.name,
      isArchived: problemSetup.is_archived,
      isAvailable: problemSetup.is_available,
      initialCode: problemSetup.initial_code,
      initialSolution: problemSetup.initial_solution,
      createdAt: problemSetup.created_at,
      updatedAt: problemSetup.updated_at,
    });

    const testEntities = tests.map(
      (test) =>
        new TestImplementation({
          id: test.id,
          code: test.code,
          additionalTestFile: test.additional_test_file_id,
          createdAt: test.created_at,
          updatedAt: test.updated_at,
        }),
    );

    return new ProblemSetupImplementation({
      id: problemSetup.problem_id,
      problem,
      language,
      initialCode: problemSetup.initial_code,
      tests: testEntities,
      createdAt: problemSetup.created_at,
      updatedAt: problemSetup.updated_at,
    });
  }
}
