import { ProblemInitialInputsModel } from "../ProblemInitialInputsModel";
import { ProblemTestModel } from "../ProblemTestModel";

export interface ProblemSetupModel {
  problemId: number;
  languageId: number;
  code: string;
  tests: ProblemTestModel[];
  initialInputs: ProblemInitialInputsModel[];
}
