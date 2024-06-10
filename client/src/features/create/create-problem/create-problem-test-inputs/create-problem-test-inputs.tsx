import CodeEditor from "@/components/code-editor/code-editor";
import { Label } from "@/components/ui/label";
import { useCreateProblem } from "../create-problem.provider";

const CreateProblemTestInputs = () => {
  const { createProblem, changeCreateProblem } = useCreateProblem();

  const changeTestInputs = (value: string) => {
    changeCreateProblem("testInputs", value);
  };

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="test-inputs">Test Inputs</Label>
      <CodeEditor
        code={createProblem.testInputs}
        changeCode={changeTestInputs}
        id="test-inputs"
        className="rounded overflow-hidden border"
      />
    </div>
  );
};

export default CreateProblemTestInputs;
