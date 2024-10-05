import { AggregateRoot } from '@nestjs/cqrs';
import { Id } from '../domain/id';

export type BaseDomainProperties = {
  id: Id;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  version: number;
};

export interface BaseDomain {
  compareId: (id: Id) => boolean;
  getId: () => Id;
  getCreatedAt: () => Date;
  getUpdatedAt: () => Date;
  getDeletedAt: () => Date | null;
  getVersion: () => number;
}

export interface BaseDomainAggregateRoot extends BaseDomain {
  commit: () => void;
}

export abstract class BaseDomainAggregateRootImplementation
  extends AggregateRoot
  implements BaseDomainAggregateRoot
{
  private readonly id: Id;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;
  private readonly deletedAt: Date | null;
  private readonly version: number;

  constructor(properties: BaseDomainProperties) {
    super();
    Object.assign(this, properties);
  }

  compareId(id: Id): boolean {
    return this.id.equals(id);
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getDeletedAt() {
    return this.deletedAt;
  }

  getId() {
    return this.id;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }

  getVersion() {
    return this.version;
  }
}

export abstract class BaseDomainImplementation implements BaseDomain {
  private readonly id: Id;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;
  private readonly deletedAt: Date | null;
  private readonly version: number;

  constructor(properties: BaseDomainProperties) {
    Object.assign(this, properties);
  }

  compareId(id: Id): boolean {
    return this.id.equals(id);
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getDeletedAt() {
    return this.deletedAt;
  }

  getId() {
    return this.id;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }

  getVersion() {
    return this.version;
  }
}
