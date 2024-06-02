import { Injectable } from '@nestjs/common';
import { BaseEntityRepository } from 'src/db/base-entity.repository';
import { AccountSchema } from './account.schema';
import { Account } from '../entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountSchemaFactory } from './account-schema.factory';

@Injectable()
export class AccountEntityRepository extends BaseEntityRepository<
  AccountSchema,
  Account
> {
  constructor(
    @InjectRepository(AccountSchema)
    accountRepository: Repository<AccountSchema>,
    accountSchemaFactory: AccountSchemaFactory,
  ) {
    super(accountRepository, accountSchemaFactory);
  }
}
