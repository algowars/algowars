import { TestInput } from "../test/test-input.model";
import { Problem } from "./problem.model";

export interface ProblemAggregate {
  problem: Problem;
  exampleInputs: TestInput[];
  initialCode: string;
}
