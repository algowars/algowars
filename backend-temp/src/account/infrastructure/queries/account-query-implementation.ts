import { Injectable } from '@nestjs/common';
import { DatabaseInjectionToken } from 'lib/database.module';
import { AccountQuery } from 'src/account/application/queries/account-query';
import { FindAccountBySubResult } from 'src/account/application/queries/find-account-by-sub-query/find-account-by-sub-result';
import { AccountEntity } from '../entities/account.entity';
import { FindAccountByUsernameResult } from 'src/account/application/queries/find-account-by-username-query/find-account-by-username-result';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { Aliases } from 'src/db/aliases';

@Injectable()
export class AccountQueryImplementation implements AccountQuery {
  constructor(
    @InjectConnection(DatabaseInjectionToken.READ_CONNECTION)
    private readonly knexConnection: Knex,
  ) {}

  async findBySub(
    sub: string,
    select = '*',
  ): Promise<FindAccountBySubResult | null> {
    const entity = await this.knexConnection(Aliases.ACCOUNTS)
      .select<AccountEntity>(select)
      .where({ sub })
      .first();

    if (!entity) {
      return null;
    }

    return {
      id: entity.id,
      sub: entity.sub,
      username: entity.username,
      createdAt: entity.created_at,
      updatedAt: entity.updated_at,
      deletedAt: entity.deleted_at,
      version: entity.version,
    };
  }

  async findBySubRaw(sub: string): Promise<AccountEntity | null> {
    const entity = await this.knexConnection(Aliases.ACCOUNTS)
      .select<AccountEntity>('*')
      .where({ sub })
      .first();

    if (!entity) {
      return null;
    }

    return entity;
  }

  async findByUsername(
    username: string,
    select = '*',
  ): Promise<FindAccountByUsernameResult | null> {
    const entity = await this.knexConnection(Aliases.ACCOUNTS)
      .select(select)
      .where({ username })
      .first();

    if (!entity) {
      return null;
    }

    return {
      id: entity.id,
      username: entity.username,
      createdAt: entity.created_at,
    };
  }
}
