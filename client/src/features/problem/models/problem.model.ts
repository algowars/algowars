import { Account } from "@/features/account/models/account.model";

export interface Problem {
  id: string;
  title: string;
  slug: string;
  question: string;
  createdBy?: Account;
}
