import { ProblemSetupModel } from "./problem-setup/ProblemSetupModel";

export interface ProblemTestModel {
  id: number;
  test: string;
  order: number;
  problemSetup?: ProblemSetupModel;
}
