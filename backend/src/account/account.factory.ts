import { EntityFactory } from 'src/db/entity.factory';
import { Account } from './entities/account.entity';
import { v4 as uuidv4 } from 'uuid';
import { AccountEntityRepository } from './db/account-entity.repository';
import { AccountCreatedEvent } from './events/account-created.event';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountFactory implements EntityFactory<Account> {
  constructor(
    private readonly accountEntityRepository: AccountEntityRepository,
  ) {}

  async create(sub: string, username: string): Promise<Account> {
    const account = new Account(
      uuidv4(),
      sub,
      username,
      new Date(),
      new Date(),
    );

    await this.accountEntityRepository.create(account);
    account.apply(new AccountCreatedEvent(account.getId()));
    return account;
  }
}
