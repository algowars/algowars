import { DatabaseInjectionToken, EntityId } from 'lib/database.module';
import { Account } from 'src/account/domain/account';
import { AccountFactory } from 'src/account/domain/account-factory';
import { AccountRepository } from 'src/account/domain/account-repository';
import { AccountEntity } from '../entities/account.entity';
import { Id, IdImplementation } from 'src/common/domain/id';
import { Username } from 'src/account/domain/username';
import { UserSub } from 'src/account/domain/user-sub';
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
    const entities = models.map((model) => ({
      id: model.getId().toString(),
      sub: model.getSub().toString(),
      username: model.getUsername().toString(),
      deleted_at: model.getDeletedAt().toISOString(),
      createdAt: model.getCreatedAt().toISOString(),
      updated_at: model.getUpdatedAt().toISOString(),
      version: model.getVersion(),
    }));

    await this.knexConnection(Aliases.ACCOUNTS).insert(entities);
  }

  async findById(id: Id, select = '*'): Promise<Account | null> {
    const entities = await this.knexConnection(Aliases.ACCOUNTS)
      .select<AccountEntity[]>(select)
      .where({ id: id.toString() });

    if (entities.length) {
      return null;
    }

    return this.entityToModel(entities[0]);
  }

  async findByUsername(
    username: Username,
    select = '*',
  ): Promise<Account | null> {
    const entities = await this.knexConnection(Aliases.ACCOUNTS)
      .select<AccountEntity[]>(select)
      .where({ username });

    if (!entities.length) {
      return null;
    }

    return this.entityToModel(entities[0]);
  }

  async findBySub(sub: UserSub, select = '*'): Promise<Account | null> {
    const entities = await this.knexConnection(Aliases.ACCOUNTS)
      .select<AccountEntity[]>(select)
      .where({ sub });

    if (!entities.length) {
      return null;
    }

    return this.entityToModel(entities[0]);
  }

  private entityToModel(entity: AccountEntity): Account {
    return this.accountFactory.createFromEntity(entity);
  }
}
