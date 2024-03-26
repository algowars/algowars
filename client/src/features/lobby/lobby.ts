import { Player } from "../player/player";
import { LobbyStatus } from "./lobby-status";

export interface Lobby {
  id: string;
  creator: Player;
  players: Player[];
  status: LobbyStatus;
}
