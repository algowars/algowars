import { Lobby } from "../lobby/lobby";
import { GameStatus } from "./game-status";

export interface Game {
  id: string;
  lobby: Lobby;
  sessions: [];
  duration: number;
  status: GameStatus;
  createdAt: Date;
  updatedAt: Date;
}
