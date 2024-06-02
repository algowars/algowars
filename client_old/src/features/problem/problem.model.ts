import { Account } from "../account/account.model";
import { ProblemSetup } from "../problem-setup/problem-setup.model";
import { Test } from "../test/test.model";

export interface Problem {
  id: number;
  title: string;
  question: string;
  slug: string;
  createdBy?: Account;
  tests?: Test[];
  problemSetups?: ProblemSetup[];
  rating?: number;
}
