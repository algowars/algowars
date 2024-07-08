# Create Account Command and Handler

This project demonstrates the implementation of a command and its handler to create an account using the CQRS (Command Query Responsibility Segregation) pattern in a NestJS application.

## Project Structure

```text
- create-account/
  - create-account.command.ts
  - create-account.handler.ts
- index.ts
```

## Files Overview

### `create-account/create-account.command.ts`

Defines the `CreateAccountCommand` class which encapsulates the data required to create an account.

### `create-account/create-account.handler.ts`

Implements the `CreateAccountHandler` class which processes the `CreateAccountCommand`.

### `index.ts`

Exports an array of command handlers for easy integration into the application.

## Usage

1. **Define DTO**: Create a Data Transfer Object (DTO) `CreateAccountRequest`.
2. **Implement Factory**: Implement the `AccountFactory` with a `create` method.
3. **Configure Module**: Configure the CQRS module in your NestJS application and register the command handler.