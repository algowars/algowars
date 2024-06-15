import { Problem } from "./problem.model";
import { Test } from "./test.model";

export interface ProblemAggregate {
  problem: Problem;
  initialCode: string;
  testCases: Test[];
}
