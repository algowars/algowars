import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateProblem } from "../create-problem.provider";

const CreateProblemSlug = () => {
  const { createProblem, changeCreateProblem } = useCreateProblem();

  const changeSlug = (value: string) => {
    changeCreateProblem("slug", value);
  };

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="slug">Slug</Label>
      <Input
        id="slug"
        placeholder="slug"
        value={createProblem.slug}
        onChange={({ target: { value } }) => changeSlug(value)}
      />
    </div>
  );
};

export default CreateProblemSlug;
