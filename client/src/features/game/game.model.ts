import { Lobby } from "../lobby/lobby.model";
import { GameStatus } from "./game-status.model";

export interface Game {
  id: string;
  lobby?: Lobby;
  sessions: [];
  duration: number;
  status?: GameStatus;
  createdAt: Date;
  updatedAt: Date;
}
