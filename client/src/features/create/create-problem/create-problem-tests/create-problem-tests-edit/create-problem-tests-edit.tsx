import { Card } from "@/components/ui/card";
import { CreateTestDto } from "../../dtos/create-test.dto";
import CodeEditor from "@/components/code-editor/code-editor";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Props = {
  test: CreateTestDto;
};

const CreateProblemTestsEdit = ({ test }: Props) => {
  const changeTest = (value: string | undefined) => {
    console.log(value);
  };
  return (
    <Card className="p-5 flex flex-col gap-5">
      <div>
        <Label htmlFor="label">Label</Label>
        <Input />
      </div>
      <CodeEditor code={test.test} changeCode={changeTest} />
    </Card>
  );
};

export default CreateProblemTestsEdit;
