import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OpenAccountCommand } from './open-account.command';
import { ConflictException, Inject } from '@nestjs/common';
import { AccountInjectionToken } from '../../injection-token';
import { AccountRepository } from 'src/account/domain/account-repository';
import { AccountFactory } from 'src/account/domain/account-factory';
import { Id } from 'src/common/domain/id';
import { Account } from 'src/account/domain/account';
import { Username } from 'src/account/domain/username';

@CommandHandler(OpenAccountCommand)
export class OpenAccountHandler
  implements ICommandHandler<OpenAccountCommand, Account>
{
  @Inject(AccountInjectionToken.ACCOUNT_REPOSITORY)
  private readonly accountRepository: AccountRepository;
  @Inject()
  private readonly accountFactory: AccountFactory;

  async execute(command: OpenAccountCommand): Promise<Account> {
    const account = this.accountFactory.create({
      ...command,
      id: await this.accountRepository.newId(),
    });

    if (!this.doesAccountExist(account)) {
      throw new ConflictException('Account already exists.');
    }

    if (!this.doesUsernameExist(account.getUsername())) {
      throw new ConflictException('Username already in use.');
    }

    account.open();

    await this.accountRepository.save(account);

    account.commit();

    return account;
  }

  private async doesAccountExist(account: Account): Promise<boolean> {
    const foundAccountBySub = await this.accountRepository.findBySub(
      account.getSub(),
    );

    return !!foundAccountBySub;
  }

  private async doesUsernameExist(username: Username): Promise<boolean> {
    const foundAccountByUsername =
      await this.accountRepository.findByUsername(username);

    return !!foundAccountByUsername;
  }
}
