import { Knex } from 'knex';
import { DatabaseInjectionToken, EntityId } from 'lib/database.module';
import { InjectConnection } from 'nest-knexjs';
import { Aliases } from 'src/db/aliases';
import { Problem, ProblemImplementation } from 'src/problem/domain/problem';
import { ProblemRepository } from 'src/problem/domain/problem-repository';
import { ProblemEntity } from '../entities/problem.entity';
import { IdImplementation } from 'src/common/domain/id';
import { AccountEntity } from 'src/account/infrastructure/entities/account.entity';
import { AccountImplementation } from 'src/account/domain/account';
import { UsernameImplementation } from 'src/account/domain/username';

export class ProblemRepositoryImplementation implements ProblemRepository {
  constructor(
    @InjectConnection(DatabaseInjectionToken.WRITE_CONNECTION)
    private readonly knexConnection: Knex,
  ) {}

  async newId(): Promise<string> {
    return new EntityId().toString();
  }

  async save(data: Problem | Problem[]): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => ({}));

    await this.knexConnection(Aliases.PROBLEMS).insert(entities);
  }

  async findById(id: string, select = '*'): Promise<Problem | null> {
    const entity = await this.knexConnection(Aliases.PROBLEMS)
      .select<ProblemEntity>(select)
      .where({ id })
      .first();

    if (!entity) {
      return null;
    }

    const account = await this.knexConnection(Aliases.ACCOUNTS)
      .select<AccountEntity>('username')
      .where({ id: entity.created_by_id })
      .first();

    return this.entityToModel(entity, account);
  }

  async findBySlug(slug: string, select = '*'): Promise<Problem | null> {
    const entity = await this.knexConnection(Aliases.PROBLEMS)
      .select<ProblemEntity>(select)
      .where({ slug })
      .first();

    if (!entity) {
      return null;
    }

    const account = await this.knexConnection(Aliases.ACCOUNTS)
      .select<AccountEntity>('username')
      .where({ id: entity.created_by_id })
      .first();

    return this.entityToModel(entity, account);
  }

  private entityToModel(
    problem: ProblemEntity,
    createdBy: AccountEntity,
  ): Problem {
    return new ProblemImplementation({
      id: new IdImplementation(problem.id),
      title: problem.title,
      question: problem.question,
      slug: problem.slug,
      status: problem.status,
      createdBy: new AccountImplementation({
        username: new UsernameImplementation(createdBy.username),
      }),
    });
  }
}
