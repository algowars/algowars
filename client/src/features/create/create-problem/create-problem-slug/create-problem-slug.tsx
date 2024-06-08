import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CreateProblemSlug = () => {
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="slug">Slug</Label>
      <Input id="slug" placeholder="slug" />
    </div>
  );
};

export default CreateProblemSlug;
