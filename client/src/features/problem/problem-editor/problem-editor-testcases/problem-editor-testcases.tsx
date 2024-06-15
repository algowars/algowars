import { Card } from "@/components/ui/card";
import { Test } from "../../models/test.model";
import ProblemEditorTestcasesNav from "./problem-editor-testcases-nav/problem-editor-testcases-nav";

type Props = {
  tests: Test[];
};

const ProblemEditorTestcases = ({ tests }: Props) => {
  return (
    <Card className="h-full">
      <ProblemEditorTestcasesNav />
    </Card>
  );
};

export default ProblemEditorTestcases;
