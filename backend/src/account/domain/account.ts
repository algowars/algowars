import { AggregateRoot } from '@nestjs/cqrs';
import { Username } from './username';
import { UserSub } from './user-sub';
import { AccountOpenedEvent } from './events/account-opened.event';
import { Id } from 'src/common/domain/id';

export type AccountEssentialProperties = Readonly<
  Required<{
    sub: string;
    username: string;
  }>
>;

export type AccountOptionalProperties = Readonly<
  Partial<{
    id: Id;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    version: number;
  }>
>;

export type AccountProperties = AccountEssentialProperties &
  Required<AccountOptionalProperties>;

export interface Account {
  compareId: (id: Id) => boolean;
  commit: () => void;
  getId: () => Id;
  getSub: () => UserSub;
  getUsername: () => Username;
  open: () => void;
}

export class AccountImplementation extends AggregateRoot implements Account {
  private readonly id: Id;
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

  compareId(id: Id): boolean {
    return this.id.equals(id);
  }

  getId(): Id {
    return this.id;
  }

  getSub(): UserSub {
    return this.sub;
  }

  getUsername(): Username {
    return this.username;
  }

  open(): void {
    this.apply(new AccountOpenedEvent(this.id));
  }
}
