import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountCreatedEvent } from './account-created.event';

@EventsHandler(AccountCreatedEvent)
// AccountCreatedHandler is an event handler for the AccountCreatedEvent.
// It implements the IEventHandler interface to handle events of type AccountCreatedEvent.
export class AccountCreatedHandler implements IEventHandler<AccountCreatedEvent> {
  // The handle method processes the AccountCreatedEvent.
  async handle({ accountId }: AccountCreatedEvent): Promise<void> {
    console.log(accountId); // Logs the accountId to the console.
  }
}
