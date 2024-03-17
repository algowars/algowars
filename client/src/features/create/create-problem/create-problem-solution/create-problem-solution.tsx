import CodeEditor from "@/components/code-editor/code-editor";
import { useCreateProblem } from "../create-problem.provider";

const CreateProblemSolution = () => {
  const { createProblem, changeCreateProblem } = useCreateProblem();

  const changeCode = (value: string | undefined) => {
    if (value !== undefined) {
      changeCreateProblem("solution", value);
    }
  };

  return (
    <CodeEditor
      code={createProblem.solution}
      changeCode={changeCode}
      className="h-[20rem] border rounded"
    />
  );
};

export default CreateProblemSolution;
