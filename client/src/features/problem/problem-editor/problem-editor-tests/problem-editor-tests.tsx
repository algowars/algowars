import { CodeEditor } from "@/components/code-editor/code-editor";
import { Test } from "../../models/test";

type ProblemEditorTestCardProps = {
  test: Test;
};

export const ProblemEditorTestCard = ({ test }: ProblemEditorTestCardProps) => {
  return (
    <div className="p-4 border rounded mb-2">
      <h5 className="font-semibold">Test</h5>
      <CodeEditor code={test.code} changeCode={() => null} />
    </div>
  );
};
