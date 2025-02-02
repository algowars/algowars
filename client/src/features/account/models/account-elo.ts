import { GameMode } from "@/features/game/models/game-mode";

export interface AccountElo {
  gameMode: GameMode;
  elo: number;
}
