import { CreateAccountHandler } from './create-account/create-account.handler';

// The AccountCommandHandlers array is used to group all command handlers related to account operations.
// This is useful in CQRS-based architectures where commands and queries are separated into distinct handlers.
// By placing handlers in an array, we can easily manage and register them with dependency injection frameworks or other mechanisms.
export const AccountCommandHandlers = [CreateAccountHandler];
