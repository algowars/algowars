import { Id } from 'src/common/domain/id';
import { Account } from 'src/account/domain/account';
import { GameMode } from './game-mode';
import { GameType } from './game-factory';
import { Lobby } from './lobby';

export interface GameProperties {
  id: Id;
  createdBy: Account;
  gameMode: GameMode;
  createdAt: Date;
  lobby: Lobby;
  startedAt?: Date;
  finishedAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  version?: number;
  gameType: GameType;
}

export abstract class Game {
  // Change private to protected if derived classes need direct access.
  protected readonly id: Id;
  protected readonly createdBy: Account;
  protected readonly gameMode: GameMode;
  protected readonly createdAt: Date;
  protected startedAt?: Date;
  protected finishedAt?: Date;
  protected lobby: Lobby;
  protected gameType: GameType;

  constructor(properties: GameProperties) {
    if (!properties.gameMode) {
      throw new Error('Game mode must be provided');
    }
    Object.assign(this, properties);
  }

  getId(): Id {
    return this.id;
  }

  getGameMode(): GameMode {
    return this.gameMode;
  }

  getGameType(): GameType {
    return this.gameType;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getCreatedBy(): Account {
    return this.createdBy;
  }

  getLobby(): Lobby {
    return this.lobby;
  }

  getFinishedAt(): Date | null {
    return this.finishedAt || null;
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

  protected abstract onStart(): void;
  protected abstract onFinish(): void;
}
