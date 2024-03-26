import { Problem, TestInput } from 'src/data-model/entities';

export interface ProblemAggregate {
  problem: Problem;
  exampleInputs: TestInput[];
  initialCode: string;
}
