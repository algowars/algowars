import { Injectable } from '@nestjs/common';
import { EntitySchemaFactory } from 'src/db/entity-schema.factory';
import { AccountSchema } from './account.schema';
import { Account } from '../entities/account.entity';

@Injectable()
export class AccountSchemaFactory
  implements EntitySchemaFactory<AccountSchema, Account>
{
  create(account: Account): AccountSchema {
    return {
      id: account.getId(),
      sub: account.getSub(),
      username: account.getUsername(),
      createdAt: account.getCreatedAt(),
      updatedAt: account.getUpdatedAt(),
    };
  }

  createFromSchema(accountSchema: AccountSchema): Account {
    return new Account(
      accountSchema.id,
      accountSchema.sub,
      accountSchema.username,
      accountSchema.createdAt,
      accountSchema.updatedAt,
    );
  }
}
