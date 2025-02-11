import { AccountElo } from "./account-elo";

export interface Account {
  id: string;
  username: string;
  createdAt: Date;
  ranks?: AccountElo[];
  picture?: string;
}
