import { Dispatch, FormEvent, SetStateAction } from "react";
import { useCreateProblem } from "../../create-problem.provider";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

type Props = {
  currentTest: number;
  setCurrentTest: Dispatch<SetStateAction<number>>;
};

const CreateProblemTestsNav = ({ currentTest, setCurrentTest }: Props) => {
  const { addTest, removeTest, createTests } = useCreateProblem();

  const createTest = (e: FormEvent) => {
    e.preventDefault();
    addTest();
  };

  const deleteTest = (e: FormEvent, index: number) => {
    e.preventDefault();
    removeTest(index);
  };

  return (
    <ul className="flex items-center gap-3">
      {createTests.map((_, index) => (
        <li key={index}>
          <Button
            variant="ghost"
            className="flex justify-between items-center gap-1.5"
          >
            Test {index + 1}{" "}
            <Button
              variant="ghost"
              className="w-6 h-6 p-0 flex justify-center items-center"
              onClick={(e) => deleteTest(e, index)}
            >
              <X size={14} />
            </Button>
          </Button>
        </li>
      ))}
      <li>
        <Button variant="ghost" onClick={createTest}>
          Add Test <Plus size={16} className="ml-1" />
        </Button>
      </li>
    </ul>
  );
};

export default CreateProblemTestsNav;
