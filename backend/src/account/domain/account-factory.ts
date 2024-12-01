import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Account, AccountImplementation, AccountProperties } from './account';
import { AccountEntity } from '../infrastructure/entities/account.entity';
import { Id, IdImplementation } from 'src/common/domain/id';
import { UserSubImplementation } from './user-sub';
import { UsernameImplementation } from './username';
import { EntityDomainFactory } from 'src/common/domain/entity-domain-factory';

export type CreateAccountOptions = Readonly<{
  id: Id;
  username: string;
  sub: string;
}>;

export class AccountFactory
  implements EntityDomainFactory<Account, AccountEntity>
{
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: CreateAccountOptions): Account {
    return this.eventPublisher.mergeObjectContext(
      new AccountImplementation({
        ...options,
        sub: new UserSubImplementation(options.sub),
        username: new UsernameImplementation(options.username),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        version: 0,
      }),
    );
  }

  createFromEntity(accountEntity: AccountEntity): Account {
    const id = new IdImplementation(accountEntity.id);

    return this.create({
      ...accountEntity,
      id,
    });
  }

  createEntityFromDomain(domain: Account): AccountEntity {
    if (!domain) {
      return null;
    }

    return {
      id: domain.getId().toString(),
      sub: domain.getSub.toString(),
      username: domain.getUsername().toString(),
      createdAt: domain.getCreatedAt(),
      updatedAt: domain.getUpdatedAt(),
      deletedAt: domain.getDeletedAt(),
      version: domain.getVersion(),
    };
  }

  reconstituteFromEntity(accountEntity: AccountEntity): Account {
    const id = new IdImplementation(accountEntity.id);

    const properties: AccountProperties = {
      ...accountEntity,
      sub: new UserSubImplementation(accountEntity.sub),
      username: new UsernameImplementation(accountEntity.username),
      id,
    };

    return this.reconstitute(properties);
  }
  reconstitute(properties: AccountProperties): Account {
    return this.eventPublisher.mergeObjectContext(
      new AccountImplementation(properties),
    );
  }
}
