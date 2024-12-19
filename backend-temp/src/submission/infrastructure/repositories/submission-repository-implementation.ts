import { DatabaseInjectionToken, EntityId } from 'lib/database.module';
import { Id, IdImplementation } from 'src/common/domain/id';
import {
  Submission,
  SubmissionImplementation,
} from 'src/submission/domain/submission';
import { SubmissionFactory } from 'src/submission/domain/submission-factory';
import { SubmissionRepository } from 'src/submission/domain/submission-repository';
import { SubmissionResult } from 'src/submission/domain/submission-result';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { Aliases } from 'src/db/aliases';

export class SubmissionRepositoryImplementation
  implements SubmissionRepository
{
  constructor(
    private readonly submissionFactory: SubmissionFactory,
    @InjectConnection(DatabaseInjectionToken.WRITE_CONNECTION)
    private readonly knexConnection: Knex,
  ) {}

  async newId(): Promise<Id> {
    return new IdImplementation(new EntityId().toString());
  }

  async findById(id: Id, select = '*'): Promise<Submission | null> {
    const entity = await this.knexConnection(Aliases.SUBMISSIONS)
      .select(select)
      .where({ id: id.toString() })
      .first();

    if (!entity) {
      return null;
    }

    return new SubmissionImplementation({});
  }

  async save(data: Submission | Submission[]): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => ({
      id: model.getId().toString(),
      source_code: model.getSourceCode(),
      language_id: model.getLanguage().getId().toNumber(),
      created_by_id: model.getCreatedBy().getId().toString(),
      code_execution_context: model.getCodeExecutionContext(),
      problem_id: model.getProblem().getId().toString(),
    }));

    await this.knexConnection(Aliases.SUBMISSIONS).insert(entities);
  }

  async updateSubmissionResult(
    submissionResult: SubmissionResult,
  ): Promise<void> {
    await this.knexConnection(Aliases.SUBMISSION_RESULTS)
      .where({
        id: submissionResult.getToken(),
      })
      .update({
        token: submissionResult.getToken(),
        source_code: submissionResult.getSourceCode(),
        language_id: submissionResult.getLanguageId(),
        stdin: submissionResult.getStdin(),
        stdout: submissionResult.getStdout(),
        time: submissionResult.getTime(),
        memory: submissionResult.getMemory(),
        stderr: submissionResult.getStderr(),
        expected_output: submissionResult.getExpectedOutput(),
        message: submissionResult.getMessage(),
        status: submissionResult.getStatus(),
        created_at: submissionResult.getCreatedAt(),
        updated_at: submissionResult.getUpdatedAt(),
        deleted_at: submissionResult.getDeletedAt(),
        version: submissionResult.getVersion(),
      });
  }
}
