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
        'submission_results.*',
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
      .where('submissions.id', id.getValue())
      .first();

    if (!entity) {
      return null;
    }

    const language = new LanguageImplementation({
      id: entity.language_id,
      name: entity.language_name,
      isArchived: entity.is_archived,
      isAvailable: entity.is_available,
    });

    const results = entity.submission_results.map((result: any) => {
      return new SubmissionResultImplementation({
        id: new IdImplementation(result.id),
        token: result.token,
        sourceCode: result.sourceCode,
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
      });
    });

    return new SubmissionImplementation({
      id: new IdImplementation(entity.id),
      sourceCode: entity.sourceCode,
      codeExecutionEngine: entity.codeExecutionEngine,
      createdBy: new AccountImplementation({
        id: new IdImplementation(entity.account_id),
        username: new UsernameImplementation(entity.username),
      }),
      language: language,
      results: results,
      problem: null,
      status: entity.status,
    });
  }
}
