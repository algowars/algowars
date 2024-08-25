import CodeEditor from "@/components/code-editor/code-editor";
import { Label } from "@/components/ui/label";
import { useCreateProblem } from "../create-problem.provider";

const CreateProblemSolution = () => {
  const { createProblem, changeCreateProblem } = useCreateProblem();

  const changeCode = (value: string) => {
    changeCreateProblem("solution", value);
  };

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="solution">Solution</Label>
      <CodeEditor
        code={createProblem.solution}
        changeCode={changeCode}
        id="solution"
        className="rounded overflow-hidden border"
      />
    </div>
  );
};

export default CreateProblemSolution;
