import { FindAccountBySubResult } from './find-account-by-sub-query/find-account-by-sub-result';
import { FindAccountByUsernameResult } from './find-account-by-username-query/find-account-by-username-result';
import { AccountEntity } from 'src/account/infrastructure/entities/account.entity';

export interface AccountQuery {
  findBySub(sub: string): Promise<FindAccountBySubResult | null>;
  findBySubRaw(sub: string): Promise<AccountEntity | null>;
  findByUsername(username: string): Promise<FindAccountByUsernameResult | null>;
}
