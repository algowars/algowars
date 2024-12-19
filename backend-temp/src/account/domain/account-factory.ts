import { Inject, Injectable } from '@nestjs/common';
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

@Injectable()
export class AccountFactory implements EntityDomainFactory<Account> {
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
    if (!accountEntity) {
      return null;
    }

    const id = new IdImplementation(accountEntity.id);

    return this.create({
      ...accountEntity,
      id,
    });
  }

  reconstitute(properties: AccountProperties): Account {
    return this.eventPublisher.mergeObjectContext(
      new AccountImplementation(properties),
    );
  }
}
