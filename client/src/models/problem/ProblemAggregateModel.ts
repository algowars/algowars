import { ProblemModel } from "./ProblemModel";
import { ProblemSetupModel } from "./problem-setup/ProblemSetupModel";

export interface ProblemAggregateModel {
  problem: ProblemModel;
  problemSetup: ProblemSetupModel;
}
