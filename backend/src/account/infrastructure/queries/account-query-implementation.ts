import { Injectable } from '@nestjs/common';
import { readConnection } from 'lib/database.module';
import { AccountQuery } from 'src/account/application/queries/account-query';
import { FindAccountBySubResult } from 'src/account/application/queries/find-account-by-sub-query/find-account-by-sub-result';
import { AccountEntity } from '../entities/account.entity';
import { FindAccountByUsernameResult } from 'src/account/application/queries/find-account-by-username-query/find-account-by-username-result';
import { Account } from 'src/account/domain/account';

@Injectable()
export class AccountQueryImplementation implements AccountQuery {
  findBySub(sub: string): Promise<FindAccountBySubResult | null> {
    return readConnection.getRepository(AccountEntity).findOneBy({ sub });
  }

  findBySubRaw(sub: string): Promise<AccountEntity | null> {
    return readConnection.getRepository(AccountEntity).findOneBy({ sub });
  }

  findByUsername(
    username: string,
  ): Promise<FindAccountByUsernameResult | null> {
    return readConnection.getRepository(AccountEntity).findOneBy({ username });
  }
}
