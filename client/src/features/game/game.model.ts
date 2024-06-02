import { Lobby } from "../lobby/lobby.model";
import { GameSession } from "./game-session/game-session.model";
import { GameStatus } from "./game-status.model";

export interface Game {
  id: string;
  lobby?: Lobby;
  sessions: GameSession[];
  duration: number;
  status?: GameStatus;
  createdAt: Date;
  updatedAt: Date;
}
