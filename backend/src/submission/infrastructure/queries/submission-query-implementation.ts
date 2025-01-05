import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { DatabaseInjectionToken } from 'lib/database.module';
import { InjectConnection } from 'nest-knexjs';
import { AccountImplementation } from 'src/account/domain/account';
import { UsernameImplementation } from 'src/account/domain/username';
import { Id, IdImplementation } from 'src/common/domain/id';
import { Aliases } from 'src/db/aliases';
import { LanguageImplementation } from 'src/problem/domain/language';
import { SubmissionQuery } from 'src/submission/application/queries/submission-query';
import {
  Submission,
  SubmissionImplementation,
} from 'src/submission/domain/submission';
import { SubmissionResultImplementation } from 'src/submission/domain/submission-result';

@Injectable()
export class SubmissionQueryImplementation implements SubmissionQuery {
  constructor(
    @InjectConnection(DatabaseInjectionToken.READ_CONNECTION)
    private readonly knexConnection: Knex,
  ) {}

  async findById(id: Id): Promise<Submission> {
    const entity = await this.knexConnection(Aliases.SUBMISSIONS)
      .select(
        'submissions.*',
        'submission_results.token as result_token',
        'submission_results.source_code as result_source_code',
        'submission_results.language_id as result_language_id',
        'submission_results.stdin as result_stdin',
        'submission_results.stdout as result_stdout',
        'submission_results.time as result_time',
        'submission_results.memory as result_memory',
        'submission_results.stderr as result_stderr',
        'submission_results.expected_output as result_expected_output',
        'submission_results.message as result_message',
        'submission_results.status as result_status',
        'submission_results.created_at as result_created_at',
        'submission_results.updated_at as result_updated_at',
        'submission_results.deleted_at as result_deleted_at',
        'submission_results.version as result_version',
        'accounts.username',
        'accounts.id as account_id',
        'languages.id as language_id',
        'languages.name as language_name',
        'languages.is_archived',
        'languages.is_available',
      )
      .join('accounts', 'submissions.created_by_id', 'accounts.id')
      .join(
        'submission_results',
        'submission_results.submission_id',
        'submissions.id',
      )
      .join('languages', 'submissions.language_id', 'languages.id')
      .where('submissions.id', id.getValue());

    if (!entity || entity.length === 0) {
      return null;
    }

    // Map the language
    const language = new LanguageImplementation({
      id: new IdImplementation(entity[0].language_id),
      name: entity[0].language_name,
      isArchived: entity[0].is_archived,
      isAvailable: entity[0].is_available,
    });

    // Group submission results
    const results = entity.map((row: any) => {
      return new SubmissionResultImplementation({
        token: row.result_token,
        sourceCode: row.result_source_code,
        languageId: row.result_language_id,
        stdin: row.result_stdin,
        stdout: row.result_stdout,
        time: row.result_time,
        memory: row.result_memory,
        stderr: row.result_stderr,
        expectedOutput: row.result_expected_output,
        message: row.result_message,
        status: row.result_status,
        createdAt: row.result_created_at,
        updatedAt: row.result_updated_at,
        deletedAt: row.result_deleted_at,
        version: row.result_version,
      });
    });

    return new SubmissionImplementation({
      id: new IdImplementation(entity[0].id),
      sourceCode: entity[0].source_code,
      codeExecutionEngine: entity[0].code_execution_context,
      createdBy: new AccountImplementation({
        id: new IdImplementation(entity[0].account_id),
        username: new UsernameImplementation(entity[0].username),
      }),
      language: language,
      results: results,
      problem: null,
      status: entity[0].status,
    });
  }
}
