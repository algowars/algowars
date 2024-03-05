import { ProblemTestModel } from "@/models/problem/ProblemTestModel";
import { Dispatch, SetStateAction } from "react";
import { useProblemEditorTests } from "./ProblemEditorTests.hooks";
import ProblemEditorTestsNav from "./problem-editor-tests-nav/ProblemEditorTestsNav";
import ProblemCodeEditor from "../../problem-code-editor/ProblemCodeEditor";

type Props = {
  tests: ProblemTestModel[];
  setTests: Dispatch<SetStateAction<ProblemTestModel[]>>;
};

const ProblemEditorTests = ({ tests, setTests }: Props) => {
  const { currentTestIndex, changeCurrentTestIndex, changeCurrentTest } =
    useProblemEditorTests(tests, setTests);
  return (
    <div>
      <ProblemEditorTestsNav
        tests={tests}
        changeCurrentTestIndex={changeCurrentTestIndex}
        currentTestIndex={currentTestIndex}
      />
      <ProblemCodeEditor
        code={tests[currentTestIndex].test}
        changeCode={changeCurrentTest}
      />
    </div>
  );
};

export default ProblemEditorTests;
