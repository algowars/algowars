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
    <div className="border rounded p-1 flex flex-col gap-3">
      <ProblemEditorTestsNav
        tests={tests}
        setTests={setTests}
        changeCurrentTestIndex={changeCurrentTestIndex}
        currentTestIndex={currentTestIndex}
      />
      <ProblemCodeEditor
        code={tests[currentTestIndex]?.test ?? ""}
        changeCode={changeCurrentTest}
        className="h-96"
      />
    </div>
  );
};

export default ProblemEditorTests;
