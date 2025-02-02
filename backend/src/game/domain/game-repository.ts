import { Id } from 'src/common/domain/id';
import { Game } from './game';
import { Account } from 'src/account/domain/account';
import { GameMode } from './game-mode';
import { GameType } from './game-factory';

export interface GameRepository {
  newId(): Promise<Id>;
  createGame(
    account: Account,
    gameMode: GameMode,
    gameType: GameType,
  ): Promise<Game>;
}
