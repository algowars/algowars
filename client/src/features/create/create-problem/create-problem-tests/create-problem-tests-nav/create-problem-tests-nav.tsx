import { Dispatch, FormEvent, SetStateAction } from "react";
import { useCreateProblem } from "../../create-problem.provider";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Props = {
  currentTest: number;
  setCurrentTest: Dispatch<SetStateAction<number>>;
};

const CreateProblemTestsNav = ({ currentTest, setCurrentTest }: Props) => {
  const { createProblem, changeCreateProblem, addTest, createTests } =
    useCreateProblem();

  const createTest = (e: FormEvent) => {
    e.preventDefault();
    addTest();
  };

  return (
    <ul className="flex items-center gap-3">
      {createTests.map((_, index) => (
        <li key={index}>
          <Button variant="ghost">Test {index}</Button>
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
