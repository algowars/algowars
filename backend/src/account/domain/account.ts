import {
  BaseDomainAggregateRoot,
  BaseDomainAggregateRootImplementation,
  BaseDomainProperties,
} from 'src/common/entities/base-domain';
import { UserSub } from './user-sub';
import { Username } from './username';
import { AccountElo } from './account-elo';

export interface AccountProperties extends BaseDomainProperties {
  sub?: UserSub;
  username?: Username;
  elos?: AccountElo[];
}

export interface Account extends BaseDomainAggregateRoot {
  getSub(): UserSub;
  getUsername(): Username;
  open(): void;
  getElos(): AccountElo[];
}

export class AccountImplementation
  extends BaseDomainAggregateRootImplementation
  implements Account
{
  private readonly sub: UserSub;
  private readonly username: Username;
  private readonly elos: AccountElo[];

  constructor(properties: AccountProperties) {
    super(properties);
    Object.assign(this, properties);
  }

  getSub(): UserSub {
    return this.sub;
  }

  getUsername(): Username {
    return this.username;
  }

  getElos(): AccountElo[] {
    return this.elos;
  }

  open(): void {
    // this.apply(new AccountOpenedEvent(this.getId()));
  }
}
