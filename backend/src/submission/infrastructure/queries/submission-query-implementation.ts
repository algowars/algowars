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
import { SubmissionStatus } from 'src/submission/domain/submission-status';

@Injectable()
export class SubmissionQueryImplementation implements SubmissionQuery {
  constructor(
    @InjectConnection(DatabaseInjectionToken.READ_CONNECTION)
    private readonly knexConnection: Knex,
  ) {}

  async findSolutions(problemId: Id): Promise<Submission[]> {
    const rawResults = await this.knexConnection(Aliases.SUBMISSIONS)
      .select(
        `${Aliases.SUBMISSIONS}.id as submission_id`,
        `${Aliases.LANGUAGES}.id as language_id`,
        `${Aliases.LANGUAGES}.name as language_name`,
        `${Aliases.LANGUAGES}.is_available as is_language_available`,
        `${Aliases.LANGUAGES}.is_archived as is_language_archived`,
        `${Aliases.ACCOUNTS}.username as created_by`,
        `${Aliases.SUBMISSIONS}.source_code`,
        `${Aliases.SUBMISSIONS}.code_execution_context`,
        `${Aliases.SUBMISSION_RESULTS}.status as result_status`,
      )
      .join(
        `${Aliases.LANGUAGES}`,
        `${Aliases.SUBMISSIONS}.language_id`,
        `${Aliases.LANGUAGES}.id`,
      )
      .join(
        `${Aliases.ACCOUNTS}`,
        `${Aliases.SUBMISSIONS}.created_by_id`,
        `${Aliases.ACCOUNTS}.id`,
      )
      .leftJoin(
        `${Aliases.SUBMISSION_RESULTS}`,
        `${Aliases.SUBMISSIONS}.id`,
        `${Aliases.SUBMISSION_RESULTS}.submission_id`,
      )
      .where(`${Aliases.SUBMISSIONS}.problem_id`, problemId.getValue())
      .andWhere(`${Aliases.SUBMISSIONS}.deleted_at`, null);

    // Group by submission_id
    const groupedResults = rawResults.reduce((acc, row) => {
      const submissionId = row.submission_id;

      if (!acc[submissionId]) {
        acc[submissionId] = {
          submissionId,
          language: {
            id: row.language_id,
            name: row.language_name,
            isAvailable: row.is_language_available,
            isArchived: row.is_language_archived,
          },
          createdBy: row.created_by,
          sourceCode: row.source_code,
          codeExecutionEngine: row.code_execution_context,
          results: [],
        };
      }

      // Add result status to results array
      if (row.result_status) {
        acc[submissionId].results.push({ status: row.result_status });
      }

      return acc;
    }, {});

    // Map to Submission aggregates
    return Object.values(groupedResults).map((result: any) => {
      const language = new LanguageImplementation({
        id: new IdImplementation(result.language.id),
        name: result.language.name,
        isAvailable: result.language.isAvailable,
        isArchived: result.language.isArchived,
      });

      const createdBy = new AccountImplementation({
        id: new IdImplementation(''),
        username: new UsernameImplementation(result.createdBy),
      });

      const submissionResults = result.results.map(
        (r: { token: string; status: SubmissionStatus }) =>
          new SubmissionResultImplementation({
            token: r.token,
            status: r.status,
          }),
      );

      return new SubmissionImplementation({
        id: result.submissionId,
        sourceCode: result.sourceCode,
        codeExecutionEngine: result.codeExecutionEngine,
        createdBy,
        language,
        results: submissionResults,
        problem: null,
      });
    });
  }
}
