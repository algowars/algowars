import { Player } from "../player/player.model";

export interface Account {
  id: number | null;
  createdAt: Date;
  updatedAt: Date;
  player: Player;
}
