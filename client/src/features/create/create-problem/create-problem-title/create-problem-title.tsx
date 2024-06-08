import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CreateProblemTitle = () => {
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="title">Title</Label>
      <Input id="title" placeholder="title" />
    </div>
  );
};

export default CreateProblemTitle;
