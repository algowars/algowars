import { Knex } from 'knex';
import { DatabaseInjectionToken, EntityId } from 'lib/database.module';
import { InjectConnection } from 'nest-knexjs';
import { Aliases } from 'src/db/aliases';
import { Problem, ProblemImplementation } from 'src/problem/domain/problem';
import { ProblemRepository } from 'src/problem/domain/problem-repository';
import { ProblemEntity } from '../entities/problem.entity';
import { IdImplementation } from 'src/common/domain/id';
import { AccountEntity } from 'src/account/infrastructure/entities/account.entity';
import { AccountImplementation } from 'src/account/domain/account';
import { UsernameImplementation } from 'src/account/domain/username';
import { Submission } from 'src/submission/domain/submission';
import { ProblemSetup } from 'src/problem/domain/problem-setup';

export class ProblemRepositoryImplementation implements ProblemRepository {
  constructor(
    @InjectConnection(DatabaseInjectionToken.WRITE_CONNECTION)
    private readonly knexConnection: Knex,
  ) {}

  async newId(): Promise<string> {
    return new EntityId().toString();
  }

  async save(data: Problem | Problem[]): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => ({}));

    await this.knexConnection(Aliases.PROBLEMS).insert(entities);
  }

  async saveAggregate(
    problem: Problem,
    problemSetup: ProblemSetup,
    submission: Submission,
  ): Promise<void> {
    await this.knexConnection.transaction(async (trx) => {
      const problemEntity = {
        id: problem.getId().getValue(),
        title: problem.getTitle(),
        question: problem.getQuestion(),
        slug: problem.getSlug(),
        status: problem.getStatus(),
        created_by_id: problem.getCreatedBy().getId().getValue(),
      };

      await trx(Aliases.PROBLEMS).insert(problemEntity);

      const submissionEntity = {
        id: submission.getId().getValue(),
        source_code: submission.getSourceCode(),
        language_id: submission.getLanguage().getId().getValue(),
        created_by_id: submission.getCreatedBy().getId().getValue(),
        problem_id: problem.getId().getValue(),
        code_execution_context: submission.getCodeExecutionEngine(),
      };

      await trx(Aliases.SUBMISSIONS).insert(submissionEntity);

      const problemSetupEntity = {
        problem_id: problemSetup.getProblem().getId().getValue(),
        language_id: problemSetup.getLanguage().getId().getValue(),
        initial_code: problemSetup.getInitialCode(),
        solution_id: submission.getId().getValue(),
      };

      await trx(Aliases.PROBLEM_SETUPS).insert(problemSetupEntity);

      const tests = problemSetup.getTests().map((test) => ({
        id: new EntityId().toString(),
        code: test.getCode(),
        problem_id: problem.getId().getValue(),
        language_id: problemSetup.getLanguage().getId().getValue(),
        additional_test_file_id:
          test.getAdditionalTestFile()?.getId().getValue() ?? null,
      }));

      if (tests.length > 0) {
        await trx(Aliases.TESTS).insert(tests);
      }

      const submissionResults = submission.getResults().map((result) => ({
        token: result.getToken(),
        source_code: result.getSourceCode(),
        language_id: result.getLanguageId(),
        stdin: result.getStdin(),
        stdout: result.getStdout(),
        time: result.getTime(),
        memory: result.getMemory(),
        stderr: result.getStderr(),
        expected_output: result.getExpectedOutput(),
        message: result.getMessage(),
        submission_id: submission.getId().getValue(),
        status: result.getStatus(),
      }));

      if (submissionResults.length > 0) {
        await trx(Aliases.SUBMISSION_RESULTS).insert(submissionResults);
      }
    });
  }

  async findById(id: string, select = '*'): Promise<Problem | null> {
    const entity = await this.knexConnection(Aliases.PROBLEMS)
      .select<ProblemEntity>(select)
      .where({ id })
      .first();

    if (!entity) {
      return null;
    }

    const account = await this.knexConnection(Aliases.ACCOUNTS)
      .select<AccountEntity>('username')
      .where({ id: entity.created_by_id })
      .first();

    return this.entityToModel(entity, account);
  }

  async findBySlug(slug: string, select = '*'): Promise<Problem | null> {
    const entity = await this.knexConnection(Aliases.PROBLEMS)
      .select<ProblemEntity>(select)
      .where({ slug })
      .first();

    if (!entity) {
      return null;
    }

    const account = await this.knexConnection(Aliases.ACCOUNTS)
      .select<AccountEntity>('username')
      .where({ id: entity.created_by_id })
      .first();

    return this.entityToModel(entity, account);
  }

  private entityToModel(
    problem: ProblemEntity,
    createdBy: AccountEntity,
  ): Problem {
    return new ProblemImplementation({
      id: new IdImplementation(problem.id),
      title: problem.title,
      question: problem.question,
      slug: problem.slug,
      status: problem.status,
      createdBy: new AccountImplementation({
        username: new UsernameImplementation(createdBy.username),
      }),
    });
  }
}
