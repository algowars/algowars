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
import { AccountEloImplementation } from 'src/account/domain/account-elo';
import { GameModes } from 'src/elo/domain/game-mode';

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
}
