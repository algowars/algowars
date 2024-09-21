import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Account, AccountImplementation, AccountProperties } from './account';
import { AccountEntity } from '../infrastructure/entities/account.entity';

type CreateAccountOptions = Readonly<{
  id: string;
  username: string;
  sub: string;
}>;

export class AccountFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: CreateAccountOptions): Account {
    return this.eventPublisher.mergeObjectContext(
      new AccountImplementation({
        ...options,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        version: 0,
      }),
    );
  }

  createFromEntity(accountEntity: AccountEntity): Account {
    return this.create(accountEntity);
  }

  reconstituteFromEntity(accountEntity: AccountEntity): Account {
    return this.reconstitute(accountEntity);
  }

  reconstitute(properties: AccountProperties): Account {
    return this.eventPublisher.mergeObjectContext(
      new AccountImplementation(properties),
    );
  }
}
