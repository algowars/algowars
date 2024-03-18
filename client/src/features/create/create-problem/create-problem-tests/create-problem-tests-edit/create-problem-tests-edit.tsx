import { Card } from "@/components/ui/card";
import { CreateTestDto } from "../../dtos/create-test.dto";
import CodeEditor from "@/components/code-editor/code-editor";
import CreateProblemTestsEditInputs from "./create-problem-tests-edit-inputs/create-problem-tests-edit-inputs";
import { useEffect, useState } from "react";
import { CreateTestInputDto } from "../../dtos/create-test-input.dto";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Props = {
  test: CreateTestDto;
};

const CreateProblemTestsEdit = ({ test }: Props) => {
  const [inputs, setInputs] = useState<CreateTestInputDto[]>([]);
  const [expectedOutput, setExpectedOutput] = useState<string>("");

  useEffect(() => {
    setInputs(test.inputs);
    setExpectedOutput(test.expectedOutput);
  }, [test]);

  const changeTest = (value: string | undefined) => {
    console.log(value);
  };
  return (
    <Card className="p-5 flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <Label>Inputs</Label>
        <CreateProblemTestsEditInputs inputs={inputs} setInputs={setInputs} />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="expected-output">Expected Output</Label>
        <Input
          placeholder="Expected Output"
          value={expectedOutput}
          onChange={(e) => setExpectedOutput(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-3">
        <Label>Test</Label>
        <CodeEditor
          code={test.test}
          changeCode={changeTest}
          className="h-[20rem] border rounded"
        />
      </div>
    </Card>
  );
};

export default CreateProblemTestsEdit;
