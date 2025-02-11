import { Account } from "@/features/account/models/account.model";
import { Tag } from "./tag.model";

export interface Problem {
  id: string;
  title: string;
  slug: string;
  question: string;
  createdBy?: Account;
  initialCode?: string;
  tags?: Tag[];
  difficulty: number;
}
