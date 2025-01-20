import { Account } from 'src/account/domain/account';

export interface AccountQuery {
  findBySub(sub: string): Promise<Account | null>;
  findByUsername(username: string): Promise<Account | null>;
}
