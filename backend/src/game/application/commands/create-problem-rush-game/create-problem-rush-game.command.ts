import { ICommand } from '@nestjs/cqrs';
import { Account } from 'src/account/domain/account';
import { GameMode } from 'src/game/domain/game-mode';

export class CreateProblemRushGameCommand implements ICommand {
  constructor(
    readonly account: Account,
    readonly gameMode: GameMode,
  ) {}
}
