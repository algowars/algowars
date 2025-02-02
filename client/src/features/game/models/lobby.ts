import { Account } from "@/features/account/models/account.model";

export interface Lobby {
  id: string;
  maxPlayers: number;
  players?: Account[];
}
