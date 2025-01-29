import { ICommand } from '@nestjs/cqrs';
import { Account } from 'src/account/domain/account';

export class CreateProblemRushGameCommand implements ICommand {
  constructor(readonly account: Account) {}
}
