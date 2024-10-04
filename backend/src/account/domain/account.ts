import { Username } from './username';
import { UserSub } from './user-sub';
import { AccountOpenedEvent } from './events/account-opened.event';
import {
  BaseDomainAggregateRoot,
  BaseDomainAggregateRootImplementation,
  BaseDomainProperties,
} from 'src/common/entities/base-domain';

export type AccountEssentialProperties = Readonly<
  Required<{
    sub: string;
    username: string;
  }>
>;

export type AccountProperties = AccountEssentialProperties &
  BaseDomainProperties;

export interface Account extends BaseDomainAggregateRoot {
  getSub: () => UserSub;
  getUsername: () => Username;
  open: () => void;
}

export class AccountImplementation
  extends BaseDomainAggregateRootImplementation
  implements Account
{
  private readonly sub: UserSub;
  private readonly username: Username;

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

  open(): void {
    this.apply(new AccountOpenedEvent(this.getId()));
  }
}
