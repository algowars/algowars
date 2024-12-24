import { Knex } from 'knex';
import { DatabaseInjectionToken, EntityId } from 'lib/database.module';
import { InjectConnection } from 'nest-knexjs';
import { Id, IdImplementation } from 'src/common/domain/id';
import { Submission } from 'src/submission/domain/submission';
import { SubmissionRepository } from 'src/submission/domain/submission-repository';
import { SubmissionEntity } from '../entities/submission.entity';
import { SubmissionResultEntity } from '../entities/submission-result.entity';
import { Aliases } from 'src/db/aliases';

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
}
