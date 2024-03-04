import { ProblemTestModel } from "@/models/problem/ProblemTestModel";
import { Dispatch, SetStateAction } from "react";

type Props = {
  tests: ProblemTestModel[];
  setTests: Dispatch<SetStateAction<ProblemTestModel[]>>;
};

const ProblemEditorTests = ({ tests }: Props) => {
  return <div>ProblemEditorTests</div>;
};

export default ProblemEditorTests;
