import { EntityFactory } from 'src/db/entity.factory';
import { Account } from './entities/account.entity';
import { v4 as uuidv4 } from 'uuid';
import { AccountEntityRepository } from './db/account-entity.repository';
import { AccountCreatedEvent } from './events/account-created.event';
import { Injectable } from '@nestjs/common';

@Injectable()
// AccountFactory is a service class that implements EntityFactory to create Account entities.
export class AccountFactory implements EntityFactory<Account> {
  constructor(
    private readonly accountEntityRepository: AccountEntityRepository, // Injects the AccountEntityRepository for database operations.
  ) { }

  // Creates a new Account entity.
  async create(sub: string, username: string): Promise<Account> {
    // Creates a new Account instance with a unique ID, sub, username, and current timestamps.
    const account = new Account(
      uuidv4(), // Generates a unique ID for the account.
      sub, // Sets the sub for the account.
      username, // Sets the username for the account.
      new Date(), // Sets the createdAt timestamp to the current date and time.
      new Date(), // Sets the updatedAt timestamp to the current date and time.
    );

    // Persists the new account entity in the database.
    await this.accountEntityRepository.create(account);

    // Applies the AccountCreatedEvent to the account.
    account.apply(new AccountCreatedEvent(account.getId()));

    // Returns the created account.
    return account;
  }
}
