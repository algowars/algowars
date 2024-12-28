import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { DatabaseInjectionToken } from 'lib/database.module';
import { InjectConnection } from 'nest-knexjs';
import { Aliases } from 'src/db/aliases';
import { ProblemQuery } from 'src/problem/application/queries/problem-query';
import { Problem, ProblemImplementation } from 'src/problem/domain/problem';
import { ProblemEntity } from '../entities/problem.entity';
import { IdImplementation } from 'src/common/domain/id';
import {
  PageResult,
  PageResultImplementation,
} from 'src/common/pagination/page-result';
import {
  ProblemSetup,
  ProblemSetupImplementation,
} from 'src/problem/domain/problem-setup';
import { ProblemSetupEntity } from '../entities/problem-setup.entity';
import { AccountImplementation } from 'src/account/domain/account';
import { UsernameImplementation } from 'src/account/domain/username';

@Injectable()
export class ProblemQueryImplementation implements ProblemQuery {
  constructor(
    @InjectConnection(DatabaseInjectionToken.READ_CONNECTION)
    private readonly knexConnection: Knex,
  ) {}

  async findBySlug(slug: string, select = '*'): Promise<Problem | null> {
    const entity = await this.knexConnection(Aliases.PROBLEMS)
      .select(`problems.${select}`, 'accounts.username')
      .join('accounts', 'problems.created_by_id', 'accounts.id')
      .where({ slug })
      .first();

    if (!entity) {
      return null;
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
      createdBy: new AccountImplementation({
        username: new UsernameImplementation(entity.username),
      }),
    });
  }

  async getPageable(
    page: number,
    size: number,
    timestamp: Date,
  ): Promise<PageResult<Problem>> {
    const offset = (page - 1) * size;

    const query = this.knexConnection(Aliases.PROBLEMS)
      .select<ProblemEntity[]>('*')
      .where('created_at', '<', timestamp)
      .orderBy('created_at', 'desc')
      .offset(offset)
      .limit(size);

    const [results, total] = await Promise.all([
      query,
      this.knexConnection(Aliases.PROBLEMS)
        .where('created_at', '<', timestamp)
        .count<{ count: number }>({ count: '*' })
        .first(),
    ]);

    const totalRecords = total?.count ?? 0;
    const totalPages = Math.ceil(totalRecords / size);

    const formattedResults = results.map(
      (entity) =>
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
        }),
    );

    return new PageResultImplementation<Problem>(
      formattedResults,
      page,
      size,
      totalPages,
    );
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
