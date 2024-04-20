import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateProblem } from "../create-problem.provider";

const CreateProblemMetadata = () => {
  const { createProblem, changeCreateProblem } = useCreateProblem();

  const changeTitle = (value: string | undefined) => {
    changeCreateProblem("title", value ?? "");
  };

  const changeSlug = (value: string | undefined) => {
    changeCreateProblem("slug", value ?? "");
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={createProblem.title}
          placeholder="Title"
          onChange={(e) => changeTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={createProblem.slug}
          placeholder="Slug"
          onChange={(e) => changeSlug(e.target.value)}
        />
      </div>
    </div>
  );
};

export default CreateProblemMetadata;
