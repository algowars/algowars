import { Injectable } from '@nestjs/common';
import { BaseEntityRepository } from 'src/db/base-entity.repository';
import { AccountSchema } from './account.schema';
import { Account } from '../entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountSchemaFactory } from './account-schema.factory';

@Injectable()
// AccountEntityRepository is a service class that extends the BaseEntityRepository
// to provide additional functionalities specific to AccountSchema and Account entities.
export class AccountEntityRepository extends BaseEntityRepository<
  AccountSchema,
  Account
> {
  constructor(
    @InjectRepository(AccountSchema)
    accountRepository: Repository<AccountSchema>, // TypeORM repository for AccountSchema
    accountSchemaFactory: AccountSchemaFactory, // Factory to create Account entities from AccountSchema
  ) {
    super(accountRepository, accountSchemaFactory); // Calls the constructor of BaseEntityRepository
  }

  // Finds an account by its 'sub' field and returns an Account entity.
  async findBySub(sub: string): Promise<Account> {
    const account = await this.entityRepository.findOne({
      where: {
        sub,
      },
    });

    // Converts the found AccountSchema to Account entity.
    return this.entitySchemaFactory.createFromSchema(account);
  }
}
