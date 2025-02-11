import { Account } from "@/features/account/models/account.model";
import { GameMode } from "./game-mode";
import { Lobby } from "./lobby";

export interface Game {
  id: string;
  title: string;
  slug: string;
  initialCode: string;
  question: string;
  tags: string[];
  difficulty: number;
  createdBy?: Account;
  gameMode?: GameMode;
  startedAt?: Date | null;
  finishedAt?: Date | null;
  lobby?: Lobby;
  createdAt: Date;
  updatedAt: Date;
}
