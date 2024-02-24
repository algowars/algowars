import { ProblemSetupModel } from "@/models/problem/problem-setup/ProblemSetupModel";
import ProblemTestcaseInputs from "./problem-testcase-inputs/ProblemTestcaseInputs";

type Props = {
  setup: ProblemSetupModel | null;
};

const ProblemTestcase = ({ setup }: Props) => {
  return (
    <div className="p-5">
      {!setup || !setup.initialInputs ? (
        <p className="font-semibold">Test Cases are not available</p>
      ) : (
        <ProblemTestcaseInputs initialInputs={setup.initialInputs} />
      )}
    </div>
  );
};

export default ProblemTestcase;
