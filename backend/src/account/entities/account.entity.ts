import { AggregateRoot } from '@nestjs/cqrs';

// Account is an aggregate root entity in the context of CQRS (Command Query Responsibility Segregation).
// It represents an account with properties and methods to access those properties.
export class Account extends AggregateRoot {
  constructor(
    private readonly id: string, // The unique identifier for the account.
    private readonly sub: string, // The subject or subscription identifier for the account.
    private readonly username: string, // The username of the account.
    private readonly createdAt: Date, // The timestamp when the account was created.
    private readonly updatedAt: Date, // The timestamp when the account was last updated.
  ) {
    super(); // Calls the constructor of AggregateRoot.
  }

  // Getter method to access the id property.
  getId() {
    return this.id;
  }

  // Getter method to access the sub property.
  getSub() {
    return this.sub;
  }

  // Getter method to access the username property.
  getUsername() {
    return this.username;
  }

  // Getter method to access the createdAt property.
  getCreatedAt() {
    return this.createdAt;
  }

  // Getter method to access the updatedAt property.
  getUpdatedAt() {
    return this.updatedAt;
  }
}
