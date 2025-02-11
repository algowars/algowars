import { Inject, Injectable } from '@nestjs/common';
import { EntityDomainFactory } from 'src/common/domain/entity-domain-factory';
import { Id } from 'src/common/domain/id';
import { Account, AccountImplementation, AccountProperties } from './account';
import { EventPublisher } from '@nestjs/cqrs';
import { UserSubImplementation } from './user-sub';
import { UsernameImplementation } from './username';

export type CreateAccountOptions = Readonly<{
  id: Id;
  username: string;
  sub?: string;
}>;

@Injectable()
export class AccountFactory implements EntityDomainFactory<Account> {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: CreateAccountOptions): Account {
    let sub = null;

    if (options.sub) {
      sub = new UserSubImplementation(options.sub);
    }

    return this.eventPublisher.mergeObjectContext(
      new AccountImplementation({
        ...options,
        sub,
        username: new UsernameImplementation(options.username),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        version: 0,
      }),
    );
  }

  reconstitute(properties: AccountProperties): Account {
    return this.eventPublisher.mergeObjectContext(
      new AccountImplementation(properties),
    );
  }
}
