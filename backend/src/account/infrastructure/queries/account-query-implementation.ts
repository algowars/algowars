import { Injectable } from '@nestjs/common';
import { DatabaseInjectionToken } from 'lib/database.module';
import { AccountQuery } from 'src/account/application/queries/account-query';
import { AccountEntity } from '../entities/account.entity';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { Aliases } from 'src/db/aliases';
import { Account, AccountImplementation } from 'src/account/domain/account';
import { Id, IdImplementation } from 'src/common/domain/id';
import { UserSubImplementation } from 'src/account/domain/user-sub';
import { UsernameImplementation } from 'src/account/domain/username';
import { AccountEloImplementation } from 'src/account/domain/account-elo';
import { GameModes } from 'src/elo/domain/game-mode';
import { SubmissionStatus } from 'src/submission/domain/submission-status';
import {
  PageResult,
  PageResultImplementation,
} from 'src/common/pagination/page-result';
import { Problem, ProblemImplementation } from 'src/problem/domain/problem';
import { TagImplementation } from 'src/problem/domain/tag';

@Injectable()
export class AccountQueryImplementation implements AccountQuery {
  constructor(
    @InjectConnection(DatabaseInjectionToken.READ_CONNECTION)
    private readonly knexConnection: Knex,
  ) {}

  async findBySub(sub: string, select = '*'): Promise<Account | null> {
    const entity = await this.knexConnection(Aliases.ACCOUNTS)
      .select<AccountEntity>(select)
      .where({ sub })
      .first();

    if (!entity) {
      return null;
    }

    const elos = await this.knexConnection('player_elos')
      .select('*')
      .where({ player_id: entity.id });

    const eloInstances = elos.map(
      (elo) =>
        new AccountEloImplementation({
          gameMode: elo.game_mode as GameModes,
          elo: elo.elo,
        }),
    );

    return new AccountImplementation({
      id: new IdImplementation(entity.id),
      sub: new UserSubImplementation(entity.sub),
      username: new UsernameImplementation(entity.username),
      createdAt: entity.created_at,
      updatedAt: entity.updated_at,
      deletedAt: entity.deleted_at,
      version: entity.version,
      elos: eloInstances,
    });
  }

  async findByUsername(
    username: string,
    select = '*',
  ): Promise<Account | null> {
    const entity = await this.knexConnection(Aliases.ACCOUNTS)
      .select(select)
      .where({ username })
      .first();

    if (!entity) {
      return null;
    }

    const elos = await this.knexConnection('player_elos')
      .select('*')
      .where({ player_id: entity.id });

    const eloInstances = elos.map(
      (elo) =>
        new AccountEloImplementation({
          gameMode: elo.game_mode as GameModes,
          elo: elo.elo,
        }),
    );

    return new AccountImplementation({
      id: new IdImplementation(entity.id),
      sub: new UserSubImplementation(entity.sub),
      username: new UsernameImplementation(entity.username),
      createdAt: entity.created_at,
      updatedAt: entity.updated_at,
      deletedAt: entity.deleted_at,
      version: entity.version,
      elos: eloInstances,
    });
  }

  async findRecentSubmissions(
    accountId: Id,
    limit = 10,
  ): Promise<
    {
      problemSlug: string;
      problemId: string;
      problemTitle: string;
      status: SubmissionStatus | null;
      createdAt: Date;
      id: string;
    }[]
  > {
    const rows = await this.knexConnection('submissions')
      .select([
        'submissions.id as submissionId',
        'submissions.created_at as createdAt',
        'problems.id as problemId',
        'problems.title as problemTitle',
        'problems.slug as problemSlug',
        'submission_results.status as status',
      ])
      .innerJoin('problems', 'submissions.problem_id', 'problems.id')
      .leftJoin(
        'submission_results',
        'submission_results.submission_id',
        'submissions.id',
      )
      .where('submissions.created_by_id', accountId.getValue())
      .orderBy('submissions.created_at', 'desc')
      .limit(limit);

    return rows.map((row) => ({
      id: row.submissionId,
      createdAt: new Date(row.createdAt),
      problemId: row.problemId,
      problemTitle: row.problemTitle,
      problemSlug: row.problemSlug,
      status: row.status as SubmissionStatus | null,
    }));
  }

  async getTotalSolutions(accountId: Id): Promise<number> {
    const result = await this.knexConnection(Aliases.SUBMISSIONS)
      .innerJoin(
        'submission_results',
        'submissions.id',
        'submission_results.submission_id',
      )
      .where({
        created_by_id: accountId.getValue(),
        'submission_results.status': SubmissionStatus.ACCEPTED,
      })
      .countDistinct('submissions.problem_id as total');

    return Number(result[0].total);
  }

  async getTotalSubmissions(accountId: Id): Promise<number> {
    const result = await this.knexConnection(Aliases.SUBMISSIONS)
      .where({ created_by_id: accountId.getValue() })
      .count('id as total');

    return Number(result[0].total);
  }

  async getAdminProblems(
    page: number,
    size: number,
    timestamp: Date,
  ): Promise<PageResult<Problem>> {
    const offset = (page - 1) * size;

    const rawResults = await this.knexConnection(Aliases.PROBLEMS)
      .select(
        'problems.*',
        'tags.id as tag_id',
        'tags.name as tag_name',
        `${Aliases.ACCOUNTS}.id as createdById`,
        `${Aliases.ACCOUNTS}.username as createdByUsername`,
      )
      .leftJoin('problem_tags', 'problems.id', 'problem_tags.problem_id')
      .leftJoin('tags', 'problem_tags.tag_id', 'tags.id')
      .leftJoin(
        Aliases.ACCOUNTS,
        'problems.created_by_id',
        `${Aliases.ACCOUNTS}.id`,
      )
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

    const problemsById = rawResults.reduce(
      (acc, row) => {
        const problemId = row.id;

        if (!acc[problemId]) {
          acc[problemId] = {
            entity: row,
            tags: [],
            createdBy: {
              id: row.createdById,
              username: row.createdByUsername,
            },
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
      },
      {} as Record<
        string,
        {
          entity: any;
          tags: TagImplementation[];
        }
      >,
    );

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
          createdBy: new AccountImplementation({
            id: new IdImplementation(entity.createdById),
            username: new UsernameImplementation(entity.createdByUsername),
          }),
        }),
    );

    return new PageResultImplementation<Problem>(
      formattedResults,
      page,
      size,
      totalPages,
    );
  }

  async getAdminProblem(slug: string): Promise<Problem> {
    const rawResults = await this.knexConnection(Aliases.PROBLEMS)
      .select(
        'problems.*',
        'accounts.username',
        'accounts.id as account_id',
        'accounts.picture as account_picture',
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
        id: new IdImplementation(entity.account_id),
        username: new UsernameImplementation(entity.username),
        picture: entity.account_picture,
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
}
