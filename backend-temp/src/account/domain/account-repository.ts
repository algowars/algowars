import { Id } from 'src/common/domain/id';
import { Account } from './account';
import { UserSub } from './user-sub';
import { Username } from './username';

export interface AccountRepository {
  newId: () => Promise<Id>;
  save: (account: Account | Account[]) => Promise<void>;
  findById: (id: Id) => Promise<Account | null>;
  findBySub: (sub: UserSub) => Promise<Account | null>;
  findByUsername: (username: Username) => Promise<Account | null>;
}
