import { Account } from "../account/account.model";
import { Test } from "../test/test";

export interface Problem {
  id: number;
  title: string;
  question: string;
  slug: string;
  createdBy: Account;
  tests: Test[];
}
