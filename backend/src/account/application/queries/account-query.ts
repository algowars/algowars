import { FindAccountBySubResult } from './find-account-by-sub-query/find-account-by-sub-result';

export interface AccountQuery {
  findBySub: (sub: string) => Promise<FindAccountBySubResult | null>;
}
