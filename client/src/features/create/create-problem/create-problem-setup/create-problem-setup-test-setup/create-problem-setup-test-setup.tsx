import CodeEditor from "@/components/code-editor/code-editor";
import { useCreateProblem } from "../../create-problem.provider";

const CreateProblemSetupTestSetup = () => {
  const { createProblem, changeCreateProblem } = useCreateProblem();

  const changeTestSetup = (value: string | undefined) => {
    changeCreateProblem("testSetup", value ?? "");
  };
  return (
    <CodeEditor
      code={createProblem.testSetup}
      changeCode={changeTestSetup}
      className="h-72 border rounded overflow-hidden"
    />
  );
};

export default CreateProblemSetupTestSetup;
