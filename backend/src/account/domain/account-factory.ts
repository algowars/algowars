import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Account, AccountImplementation, AccountProperties } from './{kebabCase name}';
import { AccountEntity } from '../infrastructure/entities/{kebabCase name}.entity';

type CreateAccountOptions = Readonly<{
  id: string;
  title: string;
  slug: string;
  question: string;
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

  createFromEntity({camelCase name}Entity: AccountEntity): Account {
    return this.create({camelCase name}Entity);
  }

  reconstituteFromEntity({camelCase name}Entity: AccountEntity): Account {
    return this.reconstitute({camelCase name}Entity);
  }

  reconstitute(properties: AccountProperties): Account {
    return this.eventPublisher.mergeObjectContext(
      new AccountImplementation(properties),
    );
  }
}
