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
  picture?: string;
}

export interface Account extends BaseDomainAggregateRoot {
  getSub(): UserSub;
  getUsername(): Username;
  open(): void;
  getElos(): AccountElo[];
  getPicture(): string;
}

export class AccountImplementation
  extends BaseDomainAggregateRootImplementation
  implements Account
{
  private readonly sub: UserSub;
  private readonly username: Username;
  private readonly elos: AccountElo[];
  private readonly picture: string;

  constructor(properties: AccountProperties) {
    super(properties);
    Object.assign(this, properties);

    if (!this.isValidImageUrl(this.picture)) {
      this.picture = '';
    }
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

  getPicture(): string {
    return this.picture;
  }

  open(): void {
    // this.apply(new AccountOpenedEvent(this.getId()));
  }

  private isValidImageUrl(imageUrl: string | undefined | null): boolean {
    if (imageUrl) {
      try {
        new URL(imageUrl);
        return true;
      } catch (error) {
        throw new Error('Invalid URL provided for picture property');
      }
    }

    return false;
  }
}
