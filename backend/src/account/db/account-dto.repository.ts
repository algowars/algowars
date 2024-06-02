import { Injectable } from '@nestjs/common';
import { PageableRepository } from 'src/common/pagination/db/pageable.repository';
import { AccountSchema } from './account.schema';
import { DataSource } from 'typeorm';

@Injectable()
export class AccountDtoRepository extends PageableRepository<AccountSchema> {
  constructor(private readonly dataSource: DataSource) {
    super(AccountSchema, dataSource);
  }
}
