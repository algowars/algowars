import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { DatabaseInjectionToken } from 'lib/database.module';
import { InjectConnection } from 'nest-knexjs';
import { Aliases } from 'src/db/aliases';
import { ProblemQuery } from 'src/problem/application/queries/problem-query';
import { Problem, ProblemImplementation } from 'src/problem/domain/problem';
import { Id, IdImplementation } from 'src/common/domain/id';
import {
  PageResult,
  PageResultImplementation,
} from 'src/common/pagination/page-result';
import {
  ProblemSetup,
  ProblemSetupImplementation,
} from 'src/problem/domain/problem-setup';
import { ProblemSetupEntity } from '../entities/problem-setup.entity';
import {
  Submission,
  SubmissionImplementation,
} from 'src/submission/domain/submission';
import { LanguageImplementation } from 'src/problem/domain/language';
import { AccountImplementation } from 'src/account/domain/account';
import { UsernameImplementation } from 'src/account/domain/username';
import { SubmissionResultImplementation } from 'src/submission/domain/submission-result';
import { SubmissionStatus } from 'src/submission/domain/submission-status';
import { TagImplementation } from 'src/problem/domain/tag';

@Injectable()
export class ProblemQueryImplementation implements ProblemQuery {
  constructor(
    @InjectConnection(DatabaseInjectionToken.READ_CONNECTION)
    private readonly knexConnection: Knex,
  ) {}

  async findBySlug(slug: string, select = '*'): Promise<Problem | null> {
    const rawResults = await this.knexConnection(Aliases.PROBLEMS)
      .select(
        `problems.${select}`,
        'accounts.username',
        'accounts.id as account_id',
        'tags.id as tag_id',
        'tags.name as tag_name',
      )
      .join('accounts', 'problems.created_by_id', 'accounts.id')
      .leftJoin('problem_tags', 'problems.id', 'problem_tags.problem_id')
      .leftJoin('tags', 'problem_tags.tag_id', 'tags.id')
      .where({ slug });

    if (!rawResults.length) {
      return null;
    }

    const entity = rawResults[0];

    const tags = rawResults
      .filter((row) => row.tag_id && row.tag_name)
      .map(
        (row) =>
          new TagImplementation({
            id: new IdImplementation(row.tag_id),
            name: row.tag_name,
          }),
      );

    let createdBy = null;

    if (entity.username) {
      createdBy = new AccountImplementation({
        id: new IdImplementation(entity.id),
        username: new UsernameImplementation(entity.username),
      });
    }

    return new ProblemImplementation({
      id: new IdImplementation(entity.id),
      title: entity.title,
      question: entity.question,
      slug: entity.slug,
      status: entity.status,
      createdAt: entity.created_at,
      updatedAt: entity.updated_at,
      deletedAt: entity.deleted_at,
      version: entity.version,
      createdBy,
      tags: tags,
      difficulty: entity.difficulty,
    });
  }

  async getPageable(
    page: number,
    size: number,
    timestamp: Date,
  ): Promise<PageResult<Problem>> {
    const offset = (page - 1) * size;

    const rawResults = await this.knexConnection(Aliases.PROBLEMS)
      .select('problems.*', 'tags.id as tag_id', 'tags.name as tag_name')
      .leftJoin('problem_tags', 'problems.id', 'problem_tags.problem_id')
      .leftJoin('tags', 'problem_tags.tag_id', 'tags.id')
      .where('problems.created_at', '<', timestamp)
      .orderBy('problems.created_at', 'desc')
      .offset(offset)
      .limit(size);

    if (!rawResults.length) {
      return new PageResultImplementation<Problem>([], page, size, 0);
    }

    const total = await this.knexConnection(Aliases.PROBLEMS)
      .where('created_at', '<', timestamp)
      .count<{ count: number }>({ count: '*' })
      .first();

    const totalRecords = total?.count ?? 0;
    const totalPages = Math.ceil(totalRecords / size);

    const problemsById = rawResults.reduce((acc, row) => {
      const problemId = row.id;

      if (!acc[problemId]) {
        acc[problemId] = {
          entity: row,
          tags: [],
        };
      }

      if (row.tag_id && row.tag_name) {
        acc[problemId].tags.push(
          new TagImplementation({
            id: new IdImplementation(row.tag_id),
            name: row.tag_name,
          }),
        );
      }

      return acc;
    }, {});

    const formattedResults = Object.values(problemsById).map(
      ({ entity, tags }: any) =>
        new ProblemImplementation({
          id: new IdImplementation(entity.id),
          title: entity.title,
          question: entity.question,
          slug: entity.slug,
          status: entity.status,
          createdAt: entity.created_at,
          updatedAt: entity.updated_at,
          deletedAt: entity.deleted_at,
          version: entity.version,
          tags,
          difficulty: entity.difficulty,
        }),
    );

    return new PageResultImplementation<Problem>(
      formattedResults,
      page,
      size,
      totalPages,
    );
  }

  async getSolutions(problemId: Id): Promise<Submission[]> {
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

      if (row.result_status) {
        acc[submissionId].results.push({ status: row.result_status });
      }

      return acc;
    }, {});

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
        id: new IdImplementation(result.submissionId),
        sourceCode: result.sourceCode,
        codeExecutionEngine: result.codeExecutionEngine,
        createdBy,
        language,
        results: submissionResults,
        problem: null,
      });
    });
  }

  async findSetup(
    problemId: string,
    languageId: number,
    select = '*',
  ): Promise<ProblemSetup | null> {
    const entity = await this.knexConnection<ProblemSetupEntity>(
      Aliases.PROBLEM_SETUPS,
    )
      .select(select)
      .where('problem_id', problemId)
      .andWhere('language_id', languageId)
      .first();

    if (!entity) {
      return null;
    }

    return new ProblemSetupImplementation({
      id: new IdImplementation(entity.id),
      initialCode: entity.initial_code,
      createdAt: entity.created_at,
      updatedAt: entity.updated_at,
      deletedAt: entity.deleted_at,
      version: entity.version,
    });
  }
}
