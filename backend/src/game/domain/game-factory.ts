import { Account } from 'src/account/domain/account';
import { Game } from './game';
import { RushGameImplementation } from './rush/rush-game';
import { Id } from 'src/common/domain/id';
import { Lobby } from './lobby';

export enum GameType {
  RUSH = 'Rush',
  SURVIVAL = 'Survival',
}

export interface GameFactoryOptions {
  id: string | Id;
  gameType: GameType;
  createdBy: Account;
  startedAt?: Date;
  lobby: Lobby;
}

export class GameFactory {
  public static createGame({ gameType, createdBy, gameMode, lobby }): Game {
    switch (gameType) {
      case GameType.RUSH:
        return new RushGameImplementation({
          createdBy,
          gameMode,
          createdAt: new Date(),
          lobby,
        });
      default:
        throw new Error(`Unown game type: ${gameType}`);
    }
  }
}
