import { Card } from "@/components/ui/card";
import { CreateTestDto } from "../../dtos/create-test.dto";
import CodeEditor from "@/components/code-editor/code-editor";
import CreateProblemTestsEditInputs from "./create-problem-tests-edit-inputs/create-problem-tests-edit-inputs";
import { useState } from "react";
import { CreateTestInputDto } from "../../dtos/create-test-input.dto";
import { Label } from "@/components/ui/label";

type Props = {
  test: CreateTestDto;
};

const CreateProblemTestsEdit = ({ test }: Props) => {
  const [inputs, setInputs] = useState<CreateTestInputDto[]>([]);

  const changeTest = (value: string | undefined) => {
    console.log(value);
  };
  return (
    <Card className="p-5 flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <Label>Inputs</Label>
        <CreateProblemTestsEditInputs inputs={inputs} setInputs={setInputs} />
      </div>

      <CodeEditor
        code={test.test}
        changeCode={changeTest}
        className="h-[20rem] border rounded"
      />
    </Card>
  );
};

export default CreateProblemTestsEdit;
