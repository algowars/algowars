import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OpenAccountCommand } from './open-account.command';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection-token';
import { AccountRepository } from 'src/account/domain/account-repository';
import { AccountFactory } from 'src/account/domain/account-factory';
import { Transactional } from 'lib/transactional';
import { Id } from 'src/common/domain/id';

@CommandHandler(OpenAccountCommand)
export class OpenAccountHandler
  implements ICommandHandler<OpenAccountCommand, Id>
{
  @Inject(InjectionToken.ACCOUNT_REPOSITORY)
  private readonly accountRepository: AccountRepository;
  @Inject()
  private readonly accountFactory: AccountFactory;

  @Transactional()
  async execute(command: OpenAccountCommand): Promise<Id> {
    const account = this.accountFactory.create({
      ...command,
      id: await this.accountRepository.newId(),
    });

    account.open();

    await this.accountRepository.save(account);

    account.commit();

    return account.getId();
  }
}
