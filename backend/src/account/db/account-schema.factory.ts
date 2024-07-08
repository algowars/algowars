import { Injectable } from '@nestjs/common';
import { EntitySchemaFactory } from 'src/db/entity-schema.factory';
import { AccountSchema } from './account.schema';
import { Account } from '../entities/account.entity';

@Injectable()
// AccountSchemaFactory is a service class that implements EntitySchemaFactory
// to convert between AccountSchema and Account entities.
export class AccountSchemaFactory
  implements EntitySchemaFactory<AccountSchema, Account> {
  // Creates an AccountSchema from an Account entity.
  create(account: Account): AccountSchema {
    return {
      id: account.getId(), // Maps Account ID to AccountSchema ID
      sub: account.getSub(), // Maps Account sub to AccountSchema sub
      username: account.getUsername(), // Maps Account username to AccountSchema username
      createdAt: account.getCreatedAt(), // Maps Account createdAt to AccountSchema createdAt
      updatedAt: account.getUpdatedAt(), // Maps Account updatedAt to AccountSchema updatedAt
    };
  }

  // Creates an Account entity from an AccountSchema.
  createFromSchema(accountSchema: AccountSchema): Account {
    return new Account(
      accountSchema.id, // Maps AccountSchema ID to Account ID
      accountSchema.sub, // Maps AccountSchema sub to Account sub
      accountSchema.username, // Maps AccountSchema username to Account username
      accountSchema.createdAt, // Maps AccountSchema createdAt to Account createdAt
      accountSchema.updatedAt, // Maps AccountSchema updatedAt to Account updatedAt
    );
  }
}
