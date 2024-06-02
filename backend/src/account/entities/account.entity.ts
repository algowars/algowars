import { AggregateRoot } from '@nestjs/cqrs';

export class Account extends AggregateRoot {
  constructor(
    private readonly id: string,
    private readonly sub: string,
    private readonly username: string,
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
  ) {
    super();
  }

  getId() {
    return this.id;
  }

  getSub() {
    return this.sub;
  }

  getUsername() {
    return this.username;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }
}
