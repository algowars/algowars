import { AggregateRoot } from '@nestjs/cqrs';
import { Username } from './username';
import { UserSub } from './user-sub';

export type AccountEssentialProperties = Readonly<
  Required<{
    username: string;
  }>
>;

export type AccountOptionalProperties = Readonly<
  Partial<{
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    version: number;
  }>
>;

export type AccountProperties = AccountEssentialProperties &
  Required<AccountOptionalProperties>;

export interface Account {
  compareId: (id: string) => boolean;
  commit: () => void;
  getSub: () => UserSub;
  getUsername: () => Username;
}

export class AccountImplementation extends AggregateRoot implements Account {
  private readonly id: string;
  private readonly sub: UserSub;
  private readonly username: Username;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;
  private readonly deletedAt: Date | null;
  private readonly version: number;

  constructor(properties: AccountProperties) {
    super();
    Object.assign(this, properties);
  }

  compareId(id: string): boolean {
    return id === this.id;
  }

  getUsername(): Username {
    return this.username;
  }

  getSub(): UserSub {
    return this.sub;
  }
}
