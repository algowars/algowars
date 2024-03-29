import { Player } from "../player/player";

export interface Account {
  id: number | null;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  player?: Player;
}
