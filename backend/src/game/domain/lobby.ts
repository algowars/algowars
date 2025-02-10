import { Account } from 'src/account/domain/account';
import { Id } from 'src/common/domain/id';

export interface LobbyProperties {
  id: Id;
  maxPlayers: number;
  players?: Account[];
}

export interface Lobby {
  getId(): Id;
  getMaxPlayers(): number;
  getPlayerCount(): number;
  addPlayer(player: Account): void;
  getPlayers(): Account[];
  removePlayer(playerId: Id): void;
  isReady(): boolean;
}

export class LobbyImplementation implements Lobby {
  private readonly maxPlayers: number;
  private players: Account[];
  private id: Id;

  constructor(properties: LobbyProperties) {
    const players = properties?.players ? properties.players : [];
    Object.assign(this, { ...properties, players });
  }

  getMaxPlayers(): number {
    return this.maxPlayers;
  }

  getPlayerCount(): number {
    return this.players.length;
  }

  getId(): Id {
    return this.id;
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

  isReady(): boolean {
    return true;
  }
}
