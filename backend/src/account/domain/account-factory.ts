import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Account, AccountImplementation, AccountProperties } from './account';
import { AccountEntity } from '../infrastructure/entities/account.entity';
import { Id, IdImplementation } from 'src/common/domain/id';

type CreateAccountOptions = Readonly<{
  id: Id;
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
    const id = new IdImplementation(accountEntity.id);

    return this.create({
      ...accountEntity,
      id,
    });
  }

  reconstituteFromEntity(accountEntity: AccountEntity): Account {
    const id = new IdImplementation(accountEntity.id);

    const properties: AccountProperties = {
      ...accountEntity,
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
