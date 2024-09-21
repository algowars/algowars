import { Inject } from '@nestjs/common';
import { EntityId, writeConnection } from 'lib/database.module';
import { Account, AccountProperties } from 'src/account/domain/account';
import { AccountFactory } from 'src/account/domain/account-factory';
import { AccountRepository } from 'src/account/domain/account-repository';
import { AccountEntity } from '../entities/account.entity';

export class AccountRepositoryImplementation implements AccountRepository {
  @Inject() private readonly accountFactory: AccountFactory;

  async newId(): Promise<string> {
    return new EntityId().toString();
  }

  async save(data: Account | Account[]): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => this.modelToEntity(model));
    await writeConnection.manager.getRepository(AccountEntity).save(entities);
  }

  async findById(id: string): Promise<Account | null> {
    const entity = await writeConnection.manager
      .getRepository(AccountEntity)
      .findOneBy({ id });
    return entity ? this.entityToModel(entity) : null;
  }

  private modelToEntity(model: Account): AccountEntity {
    const properties = JSON.parse(JSON.stringify(model)) as AccountProperties;

    return properties;
  }

  private entityToModel(entity: AccountEntity): Account {
    return this.accountFactory.createFromEntity(entity);
  }
}
