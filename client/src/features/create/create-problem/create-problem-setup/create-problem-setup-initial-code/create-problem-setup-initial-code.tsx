import CodeEditor from "@/components/code-editor/code-editor";
import { useCreateProblem } from "../../create-problem.provider";

const CreateProblemSetupInitialCode = () => {
  const { createProblem, changeCreateProblem } = useCreateProblem();

  const changeInitialCode = (value: string | undefined) => {
    changeCreateProblem("initialCode", value ?? "");
  };
  return (
    <CodeEditor
      code={createProblem.initialCode}
      changeCode={changeInitialCode}
      className="h-72 border rounded overflow-hidden"
    />
  );
};

export default CreateProblemSetupInitialCode;
