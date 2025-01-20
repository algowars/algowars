import { GameModes } from "@/features/game/models/game-modes";

export interface AccountElo {
  gameMode: GameModes;
  elo: number;
}
