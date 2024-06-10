import CodeEditor from "@/components/code-editor/code-editor";
import { Label } from "@/components/ui/label";
import { useCreateProblem } from "../create-problem.provider";

const CreateProblemTestSetup = () => {
  const { createProblem, changeCreateProblem } = useCreateProblem();

  const changeCode = (value: string) => {
    changeCreateProblem("testSetup", value);
  };

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="test-setup">Test Setup</Label>
      <CodeEditor
        code={createProblem.testSetup}
        changeCode={changeCode}
        id="test-setup"
        className="rounded overflow-hidden border"
      />
    </div>
  );
};

export default CreateProblemTestSetup;
