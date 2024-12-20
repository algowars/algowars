import { DatabaseInjectionToken, EntityId } from 'lib/database.module';
import { Account, AccountImplementation } from 'src/account/domain/account';
import { AccountFactory } from 'src/account/domain/account-factory';
import { AccountRepository } from 'src/account/domain/account-repository';
import { AccountEntity } from '../entities/account.entity';
import { Id, IdImplementation } from 'src/common/domain/id';
import { Username, UsernameImplementation } from 'src/account/domain/username';
import { UserSub, UserSubImplementation } from 'src/account/domain/user-sub';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { Aliases } from 'src/db/aliases';

export class AccountRepositoryImplementation implements AccountRepository {
  constructor(
    private readonly accountFactory: AccountFactory,
    @InjectConnection(DatabaseInjectionToken.WRITE_CONNECTION)
    private readonly knexConnection: Knex,
  ) {}

  async newId(): Promise<Id> {
    return new IdImplementation(new EntityId().toString());
  }

  async save(data: Account | Account[]): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    const entities: AccountEntity[] = models.map((model) => ({
      id: model.getId().toString(),
      sub: model.getSub().toString(),
      username: model.getUsername().toString(),
      deleted_at: model.getDeletedAt() ?? null,
      created_at: model.getCreatedAt(),
      updated_at: model.getUpdatedAt(),
      version: model.getVersion(),
    }));

    await this.knexConnection(Aliases.ACCOUNTS).insert(entities);
  }

  async findById(id: Id, select = '*'): Promise<Account | null> {
    const entity = await this.knexConnection(Aliases.ACCOUNTS)
      .select<AccountEntity>(select)
      .where({ id: id.toString() })
      .first();

    if (!entity) {
      return null;
    }

    return this.entityToModel(entity);
  }

  async findByUsername(
    username: Username,
    select = '*',
  ): Promise<Account | null> {
    const entity = await this.knexConnection(Aliases.ACCOUNTS)
      .select<AccountEntity>(select)
      .where({ username })
      .first();

    if (!entity) {
      return null;
    }

    return this.entityToModel(entity);
  }

  async findBySub(sub: UserSub, select = '*'): Promise<Account | null> {
    const entity = await this.knexConnection(Aliases.ACCOUNTS)
      .select<AccountEntity>(select)
      .where({ sub })
      .first();

    if (!entity) {
      return null;
    }

    return this.entityToModel(entity);
  }

  private entityToModel(account: AccountEntity): Account {
    return new AccountImplementation({
      id: new IdImplementation(account.id),
      sub: new UserSubImplementation(account.sub),
      username: new UsernameImplementation(account.username),
      createdAt: account.created_at,
      updatedAt: account.updated_at,
      deletedAt: account.deleted_at,
      version: account.version,
    });
  }
}
