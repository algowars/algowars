import { GameModes } from "@/features/game/models/game-mode";

export interface AccountElo {
  gameMode: GameModes;
  elo: number;
}
