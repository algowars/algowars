import { Problem, ProblemSetup } from '../entities';

export interface ProblemAggregate {
  problem: Problem;
  problemSetup: ProblemSetup;
}
