import { Injectable } from '@nestjs/common';
import { DatabaseInjectionToken } from 'lib/database.module';
import { AccountQuery } from 'src/account/application/queries/account-query';
import { AccountEntity } from '../entities/account.entity';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { Aliases } from 'src/db/aliases';
import { Account, AccountImplementation } from 'src/account/domain/account';
import { IdImplementation } from 'src/common/domain/id';
import { UserSubImplementation } from 'src/account/domain/user-sub';
import { UsernameImplementation } from 'src/account/domain/username';

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

    return new AccountImplementation({
      id: new IdImplementation(entity.id),
      sub: new UserSubImplementation(entity.sub),
      username: new UsernameImplementation(entity.username),
      createdAt: entity.created_at,
      updatedAt: entity.updated_at,
      deletedAt: entity.deleted_at,
      version: entity.version,
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

    return new AccountImplementation({
      id: new IdImplementation(entity.id),
      sub: new UserSubImplementation(entity.sub),
      username: new UsernameImplementation(entity.username),
      createdAt: entity.created_at,
      updatedAt: entity.updated_at,
      deletedAt: entity.deleted_at,
      version: entity.version,
    });
  }
}
