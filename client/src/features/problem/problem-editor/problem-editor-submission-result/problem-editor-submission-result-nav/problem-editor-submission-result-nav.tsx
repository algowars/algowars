import { Button } from "@/components/ui/button";
import { SubmissionResultTestcase } from "@/features/submission-result/models/submission-result-testcase";

type Props = {
  testcases: SubmissionResultTestcase[];
  currentResultIndex: number;
  changeCurrentResultIndex: (value: number) => void;
};

const ProblemEditorSubmissionResultNav = ({
  testcases,
  currentResultIndex,
  changeCurrentResultIndex,
}: Props) => {
  return (
    <ul className="flex items-center gap-1 px-3 pt-3">
      {testcases.map((testcase, index) => (
        <Button
          onClick={() => changeCurrentResultIndex(index)}
          className="h-8"
          variant={currentResultIndex === index ? "secondary" : "ghost"}
        >
          Test {testcase.order + 1}
        </Button>
      ))}
    </ul>
  );
};

export default ProblemEditorSubmissionResultNav;
