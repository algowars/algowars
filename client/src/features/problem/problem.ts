import { Account } from "../account/account.model";
import { ProblemSetup } from "../problem-setup/problem-setup";
import { Test } from "../test/test";

export interface Problem {
  id: number;
  title: string;
  question: string;
  slug: string;
  createdBy?: Account;
  tests?: Test[];
  problemSetups?: ProblemSetup[];
}
