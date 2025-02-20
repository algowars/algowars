import { CodeEditor } from "@/components/code-editor/code-editor";
import { Test } from "../../models/test";

type ProblemEditorTestCodeCardProps = {
  test: Test;
};

export const ProblemEditorTestCodeCard = ({
  test,
}: ProblemEditorTestCodeCardProps) => {
  return (
    <div>
      <CodeEditor code={test?.code ?? ""} changeCode={() => null} />
    </div>
  );
};
