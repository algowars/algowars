import { TestInput } from "../test/test-input";
import { Problem } from "./problem";

export interface ProblemAggregate {
  problem: Problem;
  exampleInputs: TestInput[];
  initialCode: string;
}
