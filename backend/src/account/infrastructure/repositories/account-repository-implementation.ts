import { DatabaseInjectionToken, EntityId } from 'lib/database.module';
import { Account, AccountImplementation } from 'src/account/domain/account';
import { AccountRepository } from 'src/account/domain/account-repository';
import { AccountEntity } from '../entities/account.entity';
import { Id, IdImplementation } from 'src/common/domain/id';
import { Username, UsernameImplementation } from 'src/account/domain/username';
import { UserSub, UserSubImplementation } from 'src/account/domain/user-sub';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { Aliases } from 'src/db/aliases';
import { GameModes } from 'src/elo/domain/game-mode';

export class AccountRepositoryImplementation implements AccountRepository {
  constructor(
    @InjectConnection(DatabaseInjectionToken.WRITE_CONNECTION)
    private readonly knexConnection: Knex,
  ) {}

  async newId(): Promise<Id> {
    return new IdImplementation(new EntityId().toString());
  }

  async save(data: Account | Account[]): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    await this.knexConnection.transaction(async (trx) => {
      const entities: AccountEntity[] = models.map((model) => ({
        id: model.getId().toString(),
        sub: model.getSub().toString(),
        username: model.getUsername().toString(),
        deleted_at: model.getDeletedAt() ?? null,
        created_at: model.getCreatedAt(),
        updated_at: model.getUpdatedAt(),
        version: model.getVersion(),
        picture: model.getPicture() ?? null,
      }));

      await trx(Aliases.ACCOUNTS).insert(entities);

      for (const entity of entities) {
        const playerElo = {
          player_id: entity.id,
          game_mode: GameModes.STANDARD,
          elo: 0,
        };

        await trx('player_elos').insert(playerElo);
      }
    });
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
