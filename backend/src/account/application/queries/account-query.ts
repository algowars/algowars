import { Account } from 'src/account/domain/account';
import { Username } from 'src/account/domain/username';
import { AccountEntity } from 'src/account/infrastructure/entities/account.entity';

export interface AccountQuery {
  findBySub(sub: string): Promise<Account | null>;
  findByUsername(username: Username): Promise<Account | null>;
}
