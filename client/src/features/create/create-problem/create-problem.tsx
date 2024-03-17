import { Label } from "@/components/ui/label";
import { useCreateProblem } from "./create-problem.provider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CreateProblemQuestion from "./create-problem-question/create-problem-question";
import CreateProblemTests from "./create-problem-tests/create-problem-tests";
import CreateProblemSolution from "./create-problem-solution/create-problem-solution";

const CreateProblem = () => {
  const { createProblem, changeCreateProblem } = useCreateProblem();
  return (
    <form className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <Label htmlFor="title">Title</Label>
        <Input
          value={createProblem.title}
          onChange={(e) => changeCreateProblem("title", e.target.value)}
          placeholder="Title"
          id="title"
        />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="slug">Slug</Label>
        <Input
          value={createProblem.slug}
          onChange={(e) => changeCreateProblem("slug", e.target.value)}
          placeholder="Slug"
          id="slug"
        />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="question">Question</Label>
        <CreateProblemQuestion />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="solution">Solution</Label>
        <CreateProblemSolution />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="tests">Tests</Label>
        <CreateProblemTests />
      </div>

      <div>
        <Button>Create Problem</Button>
      </div>
    </form>
  );
};

export default CreateProblem;
