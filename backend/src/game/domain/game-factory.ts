import { Account } from 'src/account/domain/account';
import { Game } from './game';
import { RushGameImplementation } from './rush/rush-game';
import { Id, IdImplementation } from 'src/common/domain/id';
import { Lobby } from './lobby';
import { GameMode } from './game-mode';
import { Injectable } from '@nestjs/common';

export enum GameType {
  RUSH = 'Rush',
  SURVIVAL = 'Survival',
}

export interface GameFactoryOptions {
  id: string | Id;
  gameType: GameType;
  createdBy: Account;
  gameMode: GameMode;
  lobby: Lobby;
  createdAt: Date;
  updatedAt?: Date;
  startedAt?: Date;
}

@Injectable()
export class GameFactory {
  public create({
    id,
    gameType,
    createdBy,
    gameMode,
    lobby,
    createdAt,
    updatedAt,
  }: GameFactoryOptions): Game {
    switch (gameType) {
      case GameType.RUSH:
        return new RushGameImplementation({
          createdBy,
          gameMode,
          createdAt,
          updatedAt,
          lobby,
          id: this.createId(id),
        });
      default:
        throw new Error(`Unown game type: ${gameType}`);
    }
  }

  private createId(id: string | Id): Id {
    if (typeof id === 'string') {
      return new IdImplementation(id);
    }

    return id;
  }
}
