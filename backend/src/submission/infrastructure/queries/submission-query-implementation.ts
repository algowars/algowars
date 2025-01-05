import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { DatabaseInjectionToken } from 'lib/database.module';
import { InjectConnection } from 'nest-knexjs';
import { AccountImplementation } from 'src/account/domain/account';
import { UsernameImplementation } from 'src/account/domain/username';
import { Id, IdImplementation } from 'src/common/domain/id';
import { Aliases } from 'src/db/aliases';
import { LanguageImplementation } from 'src/problem/domain/language';
import { ProblemImplementation } from 'src/problem/domain/problem';
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

  async findByUserId(accountId: Id): Promise<Submission[]> {
    const submissionsData = await this.knexConnection
      .from(`${Aliases.SUBMISSIONS} as s`)
      .leftJoin(
        `${Aliases.SUBMISSION_RESULTS} as sr`,
        's.id',
        'sr.submission_id',
      )
      .leftJoin(`${Aliases.PROBLEMS} as p`, 's.problem_id', 'p.id')
      .leftJoin(`${Aliases.LANGUAGES} as l`, 's.language_id', 'l.id')
      .where('s.created_by_id', accountId.getValue())
      .select(
        's.id as submission_id',
        's.source_code',
        's.language_id',
        's.code_execution_context',
        's.problem_id',
        's.created_by_id',
        's.created_at',
        'p.title as problem_title',
        'p.slug as problem_slug',
        'sr.token as result_token',
        'sr.source_code as result_source_code',
        'sr.language_id as result_language_id',
        'sr.stdin',
        'sr.stdout',
        'sr.time',
        'sr.memory',
        'sr.stderr',
        'sr.expected_output',
        'sr.message',
        'sr.status as result_status',
        'sr.version as result_version',
        'l.id as language_id',
        'l.name as language_name',
      );

    const submissionsMap = new Map<
      string,
      {
        submission: SubmissionImplementation;
        results: SubmissionResultImplementation[];
      }
    >();

    submissionsData.forEach((row) => {
      if (!submissionsMap.has(row.submission_id)) {
        submissionsMap.set(row.submission_id, {
          submission: new SubmissionImplementation({
            id: new IdImplementation(row.submission_id),
            sourceCode: row.source_code,
            language: new LanguageImplementation({
              id: new IdImplementation(row.language_id),
              name: row.language_name,
            }),
            codeExecutionEngine: row.code_execution_context,
            createdBy: new AccountImplementation({
              id: new IdImplementation(row.created_by_id),
            }),
            problem: row.problem_id
              ? new ProblemImplementation({
                  id: new IdImplementation(row.problem_id),
                  title: row.problem_title,
                  slug: row.problem_slug,
                })
              : undefined,
            results: [],
            createdAt: row.created_at,
          }),
          results: [],
        });
      }

      if (row.result_token) {
        const resultProperties = {
          token: row.result_token,
          sourceCode: row.result_source_code,
          languageId: row.result_language_id,
          stdin: row.stdin,
          stdout: row.stdout,
          time: row.time,
          memory: row.memory,
          stderr: row.stderr,
          expectedOutput: row.expected_output,
          message: row.message,
          status: row.result_status,
          version: row.result_version,
        };
        submissionsMap
          .get(row.submission_id)
          ?.results.push(new SubmissionResultImplementation(resultProperties));
      }
    });

    return Array.from(submissionsMap.values()).map(
      ({ submission, results }) => {
        submission.setResults(results);
        return submission;
      },
    );
  }

  async findSubmissionsListByUserId(accountId: Id): Promise<
    {
      id: string;
      problemId: string;
      problemTitle: string;
      problemSlug: string;
      createdAt: Date;
    }[]
  > {
    const submissionsList = await this.knexConnection
      .from(`${Aliases.SUBMISSIONS} as s`)
      .leftJoin(`${Aliases.PROBLEMS} as p`, 's.problem_id', 'p.id')
      .where('s.created_by_id', accountId.getValue())
      .select(
        's.id as id',
        's.problem_id as problemId',
        'p.title as problemTitle',
        'p.slug as problemSlug',
        's.created_at as createdAt',
      );

    return submissionsList.map((row) => ({
      id: row.id,
      problemId: row.problemId,
      problemTitle: row.problemTitle,
      problemSlug: row.problemSlug,
      createdAt: row.createdAt,
    }));
  }
}
