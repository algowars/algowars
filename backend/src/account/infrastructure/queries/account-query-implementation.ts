import { Injectable } from '@nestjs/common';
import { readConnection } from 'lib/database.module';
import { AccountQuery } from 'src/account/application/queries/account-query';
import { FindAccountBySubResult } from 'src/account/application/queries/find-account-by-sub-query/find-account-by-sub-result';
import { AccountEntity } from '../entities/account.entity';

@Injectable()
export class AccountQueryImplementation implements AccountQuery {
  findBySub(sub: string): Promise<FindAccountBySubResult | null> {
    return readConnection.getRepository(AccountEntity).findOneBy({ sub });
  }
}
