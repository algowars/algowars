import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OpenAccountCommand } from './open-account.command';
import { ConflictException, Inject } from '@nestjs/common';
import { AccountInjectionToken } from '../../injection-token';
import { AccountRepository } from 'src/account/domain/account-repository';
import { AccountFactory } from 'src/account/domain/account-factory';
import { Transactional } from 'lib/transactional';
import { Id } from 'src/common/domain/id';

@CommandHandler(OpenAccountCommand)
export class OpenAccountHandler
  implements ICommandHandler<OpenAccountCommand, Id>
{
  @Inject(AccountInjectionToken.ACCOUNT_REPOSITORY)
  private readonly accountRepository: AccountRepository;
  @Inject()
  private readonly accountFactory: AccountFactory;

  @Transactional()
  async execute(command: OpenAccountCommand): Promise<Id> {
    const account = this.accountFactory.create({
      ...command,
      id: await this.accountRepository.newId(),
    });

    const foundAccountBySub = await this.accountRepository.findBySub(
      account.getSub(),
    );

    if (foundAccountBySub) {
      throw new ConflictException('Account already exists.');
    }

    const foundAccountByUsername = await this.accountRepository.findByUsername(
      account.getUsername(),
    );

    if (foundAccountByUsername) {
      throw new ConflictException('Username already in use.');
    }

    account.open();

    await this.accountRepository.save(account);

    account.commit();

    return account.getId();
  }
}
