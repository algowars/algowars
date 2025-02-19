import { Account } from "@/features/account/models/account.model";
import { Tag } from "./tag.model";
import { SubmissionType } from "./submission-type";
import { Test } from "./test";
import { TestCase } from "./test-case";

export interface Problem {
  id: string;
  title: string;
  slug: string;
  question: string;
  createdBy?: Account;
  initialCode?: string;
  tags?: Tag[];
  difficulty: number;
  submissionType: SubmissionType;
  tests: Test[];
  testCases: TestCase[];
}
