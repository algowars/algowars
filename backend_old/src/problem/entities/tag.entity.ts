import { AggregateRoot } from '@nestjs/cqrs';

export class Tag extends AggregateRoot {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
  ) {
    super();
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }
}
