import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateProblem } from "../create-problem.provider";

const CreateProblemMetadata = () => {
  const { createProblem } = useCreateProblem();
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={createProblem.title} placeholder="Title" />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" value={createProblem.slug} placeholder="Slug" />
      </div>
    </div>
  );
};

export default CreateProblemMetadata;
