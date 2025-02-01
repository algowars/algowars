import { Account } from 'src/account/domain/account';
import { Id } from 'src/common/domain/id';

export interface LobbyProperties {
  maxPlayers: number;
  players: Account[];
}

export interface Lobby {
  getMaxPlayers(): number;
  getPlayerCount(): number;
  addPlayer(player: Account): void;
  getPlayers(): Account[];
  removePlayer(playerId: Id): void;
}

export class LobbyImplementation implements Lobby {
  private readonly maxPlayers: number;
  private players: Account[];

  constructor(properties: LobbyProperties) {
    Object.assign(this, properties);
  }

  getMaxPlayers(): number {
    return this.maxPlayers;
  }

  getPlayerCount(): number {
    return this.players.length;
  }

  addPlayer(player: Account): void {
    if (this.players.length >= this.maxPlayers) {
      throw new Error('Lobby is full.');
    }
    this.players.push(player);
  }

  removePlayer(playerId: Id): void {
    this.players = this.players.filter((p) => !p.getId().equals(playerId));
  }

  getPlayers(): Account[] {
    return this.players;
  }
}
