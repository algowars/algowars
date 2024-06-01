import { Player } from "../player/player.model";

export interface CodeRush {
  id: string;
  player?: Player;
  startedAt?: Date;
  createdAt: Date;
  duration: number; // minutes
}
