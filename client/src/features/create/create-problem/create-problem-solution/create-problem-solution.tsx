import CodeEditor from "@/components/code-editor/code-editor";
import { useCreateProblem } from "../create-problem.provider";

const CreateProblemSolution = () => {
  const { createProblem, changeCreateProblem } = useCreateProblem();

  const changeSolution = (value: string | undefined) => {
    changeCreateProblem("solution", value ?? "");
  };

  return (
    <CodeEditor
      code={createProblem.solution}
      changeCode={changeSolution}
      className="h-72 border rounded overflow-hidden"
    />
  );
};

export default CreateProblemSolution;
