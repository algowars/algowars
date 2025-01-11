import { GameModes } from 'src/elo/domain/game-mode';

export interface AccountEloProperties {
  gameMode: GameModes;
  elo: number;
}

export interface AccountElo {
  getGameMode(): GameModes;
  getElo(): number;
}

export class AccountEloImplementation implements AccountElo {
  private readonly gameMode: GameModes;
  private readonly elo: number;

  constructor(properties: AccountEloProperties) {
    Object.assign(this, properties);
  }

  getGameMode(): GameModes {
    return this.gameMode;
  }

  getElo(): number {
    return this.elo;
  }
}
