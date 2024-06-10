import CodeEditor from "@/components/code-editor/code-editor";
import { Label } from "@/components/ui/label";
import { useCreateProblem } from "../create-problem.provider";

const CreateProblemInitialCode = () => {
  const { createProblem, changeCreateProblem } = useCreateProblem();

  const changeCode = (value: string) => {
    changeCreateProblem("initialCode", value);
  };

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="initial-code">Initial Code</Label>
      <CodeEditor
        code={createProblem.initialCode ?? ""}
        changeCode={changeCode}
        id="initial-code"
        className="rounded overflow-hidden border"
      />
    </div>
  );
};

export default CreateProblemInitialCode;
