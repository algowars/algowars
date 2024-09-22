import { Id } from 'src/common/domain/id';
import { Account } from './account';
import { UserSub } from './user-sub';
import { Username } from './username';
import { FindOptionsWhere } from 'typeorm';
import { AccountEntity } from '../infrastructure/entities/account.entity';

export interface AccountRepository {
  newId: () => Promise<Id>;
  save: (account: Account | Account[]) => Promise<void>;
  findBy: (options: FindOptionsWhere<AccountEntity>) => Promise<Account | null>;
  findById: (id: Id) => Promise<Account | null>;
  findBySub: (sub: UserSub) => Promise<Account | null>;
  findByUsername: (username: Username) => Promise<Account | null>;
}
