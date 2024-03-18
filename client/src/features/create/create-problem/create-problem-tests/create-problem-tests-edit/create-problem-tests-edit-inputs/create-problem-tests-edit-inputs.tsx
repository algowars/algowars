import { Dispatch, FormEvent, SetStateAction } from "react";
import { CreateTestInputDto } from "../../../dtos/create-test-input.dto";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";

type Props = {
  inputs: CreateTestInputDto[];
  setInputs: Dispatch<SetStateAction<CreateTestInputDto[]>>;
};

const CreateProblemTestsEditInputs = ({ inputs, setInputs }: Props) => {
  const addTestInput = (e: FormEvent) => {
    e.preventDefault();

    setInputs((curr) => [...curr, { label: "", input: "" }]);
  };

  const changeTestInput = (
    index: number,
    key: "label" | "input",
    value: string
  ) => {
    setInputs((currentInputs) =>
      currentInputs.map((item, i) => {
        if (i === index) {
          return { ...item, [key]: value };
        }
        return item;
      })
    );
  };

  const deleteTest = (e: FormEvent, index: number) => {
    e.preventDefault();

    setInputs((curr) => [...curr.slice(0, index), ...curr.slice(index + 1)]);
  };

  return (
    <ul className="flex flex-col gap-5">
      {inputs.map((input, index) => (
        <li key={index} className="flex items-center gap-5">
          <div className="grow">
            <Label htmlFor={`label-${index}`}>Label</Label>
            <Input
              value={input.label}
              id={`label-${index}`}
              onChange={(e) => changeTestInput(index, "label", e.target.value)}
            />
          </div>
          <div className="ml-auto grow">
            <Label htmlFor={`input-${index}`}>input</Label>
            <Input
              value={input.input}
              id={`input-${index}`}
              onChange={(e) => changeTestInput(index, "input", e.target.value)}
            />
          </div>
          <Button
            variant="destructive"
            className="w-10 h-10 p-0"
            onClick={(e) => deleteTest(e, index)}
          >
            <Trash size={18} />
          </Button>
        </li>
      ))}
      <li>
        <Button onClick={(e) => addTestInput(e)}>Add Input</Button>
      </li>
    </ul>
  );
};

export default CreateProblemTestsEditInputs;
