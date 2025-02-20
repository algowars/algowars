import { Label } from "@/components/ui/label";
import { Test } from "../../models/test";
import { Input } from "@/components/ui/input";

type ProblemEditorTestsInputProps = {
  test: Test;
};

export const ProblemEditorTestsInput = ({
  test,
}: ProblemEditorTestsInputProps) => {
  return (
    <div className="p-4 flex flex-col gap-3">
      <Label>Input</Label>
      <Input value={test?.input} />
    </div>
  );
};
