import { FindAccountBySubResult } from './find-account-by-sub-query/find-account-by-sub-result';
import { FindAccountByUsernameResult } from './find-account-by-username-query/find-account-by-username-result';

export interface AccountQuery {
  findBySub: (sub: string) => Promise<FindAccountBySubResult | null>;
  findByUsername: (
    username: string,
  ) => Promise<FindAccountByUsernameResult | null>;
}
