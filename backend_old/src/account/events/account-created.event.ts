// AccountCreatedEvent is an event class that signifies the creation of a new account.
// It contains the accountId as its data payload.
export class AccountCreatedEvent {
  constructor(
    public readonly accountId: string, // The unique identifier of the newly created account.
  ) { }
}
