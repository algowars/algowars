import { Inject } from '@nestjs/common';
import { EntityId, writeConnection } from 'lib/database.module';
import { Account, AccountProperties } from 'src/account/domain/account';
import { AccountFactory } from 'src/account/domain/account-factory';
import { AccountRepository } from 'src/account/domain/account-repository';
import { AccountEntity } from '../entities/account.entity';
import { Id, IdImplementation } from 'src/common/domain/id';
import { Username } from 'src/account/domain/username';
import { UserSub } from 'src/account/domain/user-sub';
import { FindOptionsWhere } from 'typeorm';

export class AccountRepositoryImplementation implements AccountRepository {
  @Inject() private readonly accountFactory: AccountFactory;

  async newId(): Promise<Id> {
    return new IdImplementation(new EntityId().toString());
  }

  async save(data: Account | Account[]): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => this.modelToEntity(model));
    await writeConnection.manager.getRepository(AccountEntity).save(entities);
  }

  async findBy(
    findOptions: FindOptionsWhere<AccountEntity>,
  ): Promise<Account | null> {
    const entity = await writeConnection.manager
      .getRepository(AccountEntity)
      .findOneBy(findOptions);

    return entity ? this.entityToModel(entity) : null;
  }

  async findById(id: Id): Promise<Account | null> {
    const entity = await writeConnection.manager
      .getRepository(AccountEntity)
      .findOneBy({ id: id.toString() });
    return entity ? this.entityToModel(entity) : null;
  }

  async findByUsername(username: Username): Promise<Account | null> {
    const entity = await writeConnection.manager
      .getRepository(AccountEntity)
      .findOneBy({ username: username.toString() });

    return entity ? this.entityToModel(entity) : null;
  }

  async findBySub(sub: UserSub): Promise<Account | null> {
    const entity = await writeConnection.manager
      .getRepository(AccountEntity)
      .findOneBy({ sub: sub.toString() });

    return entity ? this.entityToModel(entity) : null;
  }

  private modelToEntity(model: Account): AccountEntity {
    const properties = JSON.parse(JSON.stringify(model)) as AccountProperties;

    return {
      ...properties,
      id: model.getId().toString(),
    } as AccountEntity;
  }

  private entityToModel(entity: AccountEntity): Account {
    return this.accountFactory.createFromEntity(entity);
  }
}
