import { TestSetup } from "../test-setup/test-setup.model";
import { Problem } from "./problem";

export interface ProblemAggregate {
  problem: Problem;
  exampleInputs: TestSetup[];
  initialCode: string;
}
