import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateAccountCommand } from './create-account.command';
import { AccountFactory } from 'src/account/account.factory';

@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler
  implements ICommandHandler<CreateAccountCommand>
{
  constructor(
    private readonly accountFactory: AccountFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    createAccountRequest,
    sub,
  }: CreateAccountCommand): Promise<string> {
    const { username } = createAccountRequest;

    const account = this.eventPublisher.mergeObjectContext(
      await this.accountFactory.create(sub, username),
    );

    account.commit();
    return account.getId();
  }
}
