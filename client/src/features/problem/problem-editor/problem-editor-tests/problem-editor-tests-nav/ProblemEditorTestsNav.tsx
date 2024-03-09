import { Button } from "@/components/ui/button";
import { ProblemTestModel } from "@/models/problem/ProblemTestModel";
import { Dispatch, SetStateAction } from "react";
import { useProblemEditorTestsNav } from "./ProblemEditorTestsNav.hooks";
import { X } from "lucide-react";

type Props = {
  tests: ProblemTestModel[];
  setTests: Dispatch<SetStateAction<ProblemTestModel[]>>;
  changeCurrentTestIndex: (value: number) => void;
  currentTestIndex: number;
};

const ProblemEditorTestsNav = ({
  tests,
  setTests,
  currentTestIndex,
  changeCurrentTestIndex,
}: Props) => {
  const { addTest, changeTest, removeTest } = useProblemEditorTestsNav(
    setTests,
    changeCurrentTestIndex,
    currentTestIndex
  );
  return (
    <ul className="flex gap-1">
      {tests.map((test, index) => (
        <li key={test.id}>
          <Button
            variant={currentTestIndex === index ? "secondary" : "ghost"}
            className="p-2.5 h-7"
            onClick={() => changeTest(index)}
          >
            Test {index + 1}
            <Button
              variant="ghost"
              className="p-2 h-6 ml-1 -mr-1"
              onClick={() => removeTest(index)}
            >
              <X size={14} />
            </Button>
          </Button>
        </li>
      ))}
      <li>
        <Button variant="ghost" className="p-2.5 h-7" onClick={addTest}>
          Add Test
        </Button>
      </li>
    </ul>
  );
};

export default ProblemEditorTestsNav;
