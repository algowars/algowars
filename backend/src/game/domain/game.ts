import { Account } from 'src/account/domain/account';
import { GameMode } from './game-mode';
import { Lobby } from './lobby';

export interface GameProperties {
  createdBy: Account;
  gameMode: GameMode;
  startedAt?: Date;
  finishedAt?: Date;
  lobby: Lobby;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  version?: number;
}

export abstract class Game {
  public readonly createdBy: Account;
  public readonly gameMode: GameMode;
  public readonly createdAt: Date;
  public startedAt?: Date;
  public finishedAt?: Date;
  public lobby: Lobby;

  constructor(properties: GameProperties) {
    if (!this.gameMode) {
      throw new Error('Game mode must be provided');
    }

    Object.assign(this, properties);
  }

  public startGame(): void {
    if (this.startedAt) {
      throw new Error('Game is already active');
    }

    if (!this.lobby.isReady()) {
      throw new Error('Lobby is not ready. Please check the number of players');
    }

    this.startedAt = new Date();
    this.onStart();
  }

  public finishGame(): void {
    if (!this.startedAt) {
      throw new Error('Game has yet started');
    }

    if (this.finishedAt) {
      throw new Error('Game has already been finished');
    }

    this.finishedAt = new Date();
    this.onFinish();
  }

  /**
   * Called when the game starts
   */
  protected abstract onStart(): void;

  /**
   * Called when the game finishes
   */
  protected abstract onFinish(): void;
}
