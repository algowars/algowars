import { Game } from "../game/game";
import { Player } from "../player/player";
import { LobbyStatus } from "./lobby-status";

export interface Lobby {
  id: string;
  creator: Player;
  players?: Player[];
  status: LobbyStatus;
  name: string;
  game?: Game;
  maxPlayers: number;
}
