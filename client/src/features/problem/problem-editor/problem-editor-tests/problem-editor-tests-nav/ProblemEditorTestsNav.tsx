import { ProblemTestModel } from "@/models/problem/ProblemTestModel";

type Props = {
  tests: ProblemTestModel[];
  changeCurrentTestIndex: (value: number) => void;
  currentTestIndex: number;
};

const ProblemEditorTestsNav = (props: Props) => {
  return <div>ProblemEditorTestsNav</div>;
};

export default ProblemEditorTestsNav;
