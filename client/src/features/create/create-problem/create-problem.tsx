import { Card } from "@/components/ui/card";
import TypographyH2 from "@/components/ui/typography/typography-h2";
import { CreateProblemProvider } from "./create-problem.provider";
import CreateProblemTitle from "./create-problem-title/create-problem-title";
import CreateProblemSlug from "./create-problem-slug/create-problem-slug";
import { Button } from "@/components/ui/button";
import TypographyMuted from "@/components/ui/typography/typography-muted";
import CreateProblemInitialCode from "./create-problem-initial-code/create-problem-initial-code";
import CreateProblemSolution from "./create-problem-solution/create-problem-solution";
import CreateProblemQuestion from "./create-problem-question/create-problem-question";

const CreateProblem = () => {
  return (
    <Card className="p-5 flex flex-col gap-10">
      <header>
        <TypographyH2 border="">Create Problem</TypographyH2>
        <TypographyMuted>Create a problem for users to play.</TypographyMuted>
      </header>
      <CreateProblemProvider>
        <div className="flex flex-col gap-8 border-b pb-3">
          <CreateProblemTitle />
          <CreateProblemSlug />
          <CreateProblemQuestion />
        </div>
        <div className="flex flex-col gap-8">
          <CreateProblemInitialCode />
          <CreateProblemSolution />
        </div>
        <div>
          <Button>Create Problem</Button>
        </div>
      </CreateProblemProvider>
    </Card>
  );
};

export default CreateProblem;
