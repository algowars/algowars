import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateAccountCommand } from './create-account.command';
import { AccountFactory } from 'src/account/account.factory';

// Define the CreateAccountHandler class as a Command Handler for CreateAccountCommand
@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler
  implements ICommandHandler<CreateAccountCommand> {
  // Constructor to initialize dependencies
  constructor(
    private readonly accountFactory: AccountFactory, // AccountFactory dependency
    private readonly eventPublisher: EventPublisher, // EventPublisher dependency
  ) { }

  // Execute method to handle the command
  async execute({
    createAccountRequest,
    sub,
  }: CreateAccountCommand): Promise<string> {
    const { username } = createAccountRequest; // Extract username from the request

    // Create an account and merge it with the event context
    const account = this.eventPublisher.mergeObjectContext(
      await this.accountFactory.create(sub, username),
    );

    account.commit(); // Commit the account creation event
    return account.getId(); // Return the account ID
  }
}
