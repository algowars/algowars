import { Game } from "../game/game.model";
import { Player } from "../player/player.model";
import { LobbyStatus } from "./lobby-status.model";

export interface Lobby {
  id: string;
  creator: Player;
  players?: Player[];
  status: LobbyStatus;
  name: string;
  game?: Game;
  maxPlayers: number;
  totalPlayers?: number;
}
