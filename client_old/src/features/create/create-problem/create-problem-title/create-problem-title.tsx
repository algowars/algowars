import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateProblem } from "../create-problem.provider";

const CreateProblemTitle = () => {
  const { createProblem, changeCreateProblem } = useCreateProblem();

  const changeTitle = (value: string) => {
    changeCreateProblem("title", value);
  };

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        placeholder="title"
        value={createProblem.title}
        onChange={({ target: { value } }) => changeTitle(value)}
      />
    </div>
  );
};

export default CreateProblemTitle;
