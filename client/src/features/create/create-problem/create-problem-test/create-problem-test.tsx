import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CreateProblemTestDto } from "../dtos/create-problem-test.dto";
import { Button } from "@/components/ui/button";
import { useCreateProblem } from "../create-problem.provider";

const CreateProblemTest = () => {
  const { createProblem, addTest, changeTest, removeTest } = useCreateProblem();

  const handleInputChange = (
    index: number,
    field: keyof CreateProblemTestDto,
    value: string
  ) => {
    const updatedTest: CreateProblemTestDto = {
      ...createProblem.tests[index],
      [field]: value,
    };

    console.log(updatedTest);
    changeTest(index, updatedTest);
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <Button onClick={addTest}>Add Test</Button>
      </div>

      {createProblem.tests?.length ? (
        <ul className="grid grid-cols-12 gap-3 border p-3">
          {createProblem.tests.map(
            (test: CreateProblemTestDto, index: number) => (
              <li
                key={`test: ${index}`}
                className="border rounded p-3 col-span-3 flex flex-col gap-3"
              >
                <div className="flex flex-col gap-2">
                  <Label>Inputs</Label>
                  <Input
                    value={test.inputs}
                    placeholder="inputs"
                    onChange={(e) =>
                      handleInputChange(index, "inputs", e.target.value)
                    }
                    type="text"
                  />
                </div>
                <div>
                  <Label>Expected Output</Label>
                  <Input
                    value={test.expectedOutput}
                    placeholder="expected output"
                    onChange={(e) =>
                      handleInputChange(index, "expectedOutput", e.target.value)
                    }
                  />
                </div>
                <Button variant="destructive" onClick={() => removeTest(index)}>
                  Delete
                </Button>
              </li>
            )
          )}
        </ul>
      ) : null}
    </div>
  );
};

export default CreateProblemTest;
