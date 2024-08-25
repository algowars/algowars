import { Test } from "@/features/problem/models/test.model";
import { useProblemEditor } from "../../problem-editor.provider";
import { Button } from "@/components/ui/button";

type Props = {
  tests: Test[];
};

const ProblemEditorTestcasesNav = ({ tests }: Props) => {
  const { currentTestIndex, changeCurrentTestIndex } = useProblemEditor();

  return (
    <ul className="flex gap-1 items-center p-3">
      {tests.map((test, index) => (
        <li key={`${test.inputs}-${index}`}>
          <Button
            variant={index === currentTestIndex ? "secondary" : "ghost"}
            className="h-8"
            onClick={() => changeCurrentTestIndex(index)}
          >
            Case {index + 1}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default ProblemEditorTestcasesNav;
