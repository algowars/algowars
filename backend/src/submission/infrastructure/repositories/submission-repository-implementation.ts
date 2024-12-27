import { Knex } from 'knex';
import { DatabaseInjectionToken, EntityId } from 'lib/database.module';
import { InjectConnection } from 'nest-knexjs';
import { Id, IdImplementation } from 'src/common/domain/id';
import {
  Submission,
  SubmissionImplementation,
} from 'src/submission/domain/submission';
import { SubmissionRepository } from 'src/submission/domain/submission-repository';
import { SubmissionEntity } from '../entities/submission.entity';
import { SubmissionResultEntity } from '../entities/submission-result.entity';
import { Aliases } from 'src/db/aliases';
import { AccountEntity } from 'src/account/infrastructure/entities/account.entity';
import { AccountImplementation } from 'src/account/domain/account';
import {
  SubmissionResult,
  SubmissionResultImplementation,
} from 'src/submission/domain/submission-result';
import { LanguageImplementation } from 'src/problem/domain/language';
import { UsernameImplementation } from 'src/account/domain/username';
import { SubmissionStatus } from 'src/submission/domain/submission-status';

export class SubmissionRepositoryImplementation
  implements SubmissionRepository
{
  constructor(
    @InjectConnection(DatabaseInjectionToken.WRITE_CONNECTION)
    private readonly knexConnection: Knex,
  ) {}

  async newId(): Promise<Id> {
    return new IdImplementation(new EntityId().toString());
  }

  async findById(id: Id, select = '*'): Promise<Submission | null> {
    const entity = await this.knexConnection(Aliases.SUBMISSIONS)
      .select<SubmissionEntity>(select)
      .where({ id: id.getValue() })
      .first();

    if (!entity) {
      return null;
    }

    const account = await this.knexConnection(Aliases.ACCOUNTS)
      .select<AccountEntity>('id', 'username')
      .where({ id: entity.created_by_id })
      .first();

    const language = await this.knexConnection(Aliases.LANGUAGES)
      .select(
        'id',
        'name',
        'initial_code',
        'initial_solution',
        'is_archived',
        'is_available',
      )
      .where({ id: entity.language_id })
      .first();

    const results = await this.knexConnection(Aliases.SUBMISSION_RESULTS)
      .select<SubmissionResultEntity[]>('*')
      .where({ submission_id: id.getValue() });

    const createdBy = new AccountImplementation({
      id: new IdImplementation(account.id),
      username: new UsernameImplementation(account.username),
    });

    const languageInstance = new LanguageImplementation({
      id: new IdImplementation(language.id),
      name: language.name,
      initialCode: language.initial_code,
      initialSolution: language.initial_solution,
      isArchived: language.is_archived,
      isAvailable: language.is_available,
    });

    const resultInstances = results.map(
      (result) =>
        new SubmissionResultImplementation({
          token: result.token,
          sourceCode: result.source_code,
          languageId: result.language_id,
          stdin: result.stdin,
          stdout: result.stdout,
          time: result.time,
          memory: result.memory,
          stderr: result.stderr,
          expectedOutput: result.expected_output,
          message: result.message,
          status: result.status,
          createdAt: result.created_at,
          updatedAt: result.updated_at,
          deletedAt: result.deleted_at,
          version: result.version,
        }),
    );

    return new SubmissionImplementation({
      id: new IdImplementation(entity.id),
      sourceCode: entity.source_code,
      codeExecutionEngine: entity.code_execution_context,
      createdBy,
      language: languageInstance,
      problem: null,
      results: resultInstances,
      status: SubmissionStatus.PROCESSING,
      createdAt: entity.created_at,
      updatedAt: entity.updated_at,
      deletedAt: entity.deleted_at,
      version: entity.version,
    });
  }

  async save(data: Submission | Submission[]): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    const submissions: SubmissionEntity[] = models.map((model) => ({
      id: model.getId().toString(),
      source_code: model.getSourceCode(),
      created_by_id: model.getCreatedBy().getId().toString(),
      code_execution_context: model.getCodeExecutionEngine(),
      problem_id: model.getProblem().getId().toString(),
      language_id: model.getLanguage().getId().toNumber(),
      created_at: model.getCreatedAt(),
      updated_at: model.getUpdatedAt(),
      deleted_at: model.getDeletedAt(),
      version: model.getVersion(),
    }));

    const submissionResults: SubmissionResultEntity[] = [];

    for (const submission of models) {
      let results = submission.getResults();

      for (const result of results) {
        submissionResults.push({
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
          submission_id: submission.getId().toString(),
          status: result.getStatus(),
          created_at: result.getCreatedAt(),
          updated_at: result.getUpdatedAt(),
          deleted_at: result.getDeletedAt(),
          version: result.getVersion(),
        });
      }
    }

    await this.knexConnection(Aliases.SUBMISSIONS).insert(submissions);
    await this.knexConnection(Aliases.SUBMISSION_RESULTS).insert(
      submissionResults,
    );
  }

  async updateResult(result: SubmissionResult): Promise<void> {
    const updatedResult = {
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
      status: result.getStatus(),
      updated_at: result.getUpdatedAt() ?? new Date(),
      deleted_at: result.getDeletedAt(),
      version: result.getVersion(),
    };

    const rowsAffected = await this.knexConnection(Aliases.SUBMISSION_RESULTS)
      .where({ token: result.getToken() })
      .update(updatedResult);

    if (rowsAffected === 0) {
      throw new Error(
        `No submission result found with token: ${result.getToken()}`,
      );
    }
  }
}
