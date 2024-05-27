import { Problem } from './problem.entity';
import { TestInput } from './test-input.entity';

export interface ProblemAggregate {
  problem: Problem;
  exampleInputs: TestInput[];
  initialCode: string;
}
