import { Card } from "@/components/ui/card";
import TypographyH2 from "@/components/ui/typography/typography-h2";
import { CreateProblemProvider } from "./create-problem.provider";
import CreateProblemTitle from "./create-problem-title/create-problem-title";
import CreateProblemSlug from "./create-problem-slug/create-problem-slug";
import TypographyMuted from "@/components/ui/typography/typography-muted";
import CreateProblemInitialCode from "./create-problem-initial-code/create-problem-initial-code";
import CreateProblemSolution from "./create-problem-solution/create-problem-solution";
import CreateProblemQuestion from "./create-problem-question/create-problem-question";
import CreateProblemTestSetup from "./create-problem-test-setup/create-problem-test-setup";
import CreateProblemTestInputs from "./create-problem-test-inputs/create-problem-test-inputs";
import CreateProblemFooter from "./create-problem-footer/create-problem-footer";
import CreateProblemError from "./create-problem-error/create-problem-error";
import CreateProblemRating from "./create-problem-rating/create-problem-rating";

const CreateProblem = () => {
  return (
    <Card className="p-5 flex flex-col gap-10">
      <header>
        <TypographyH2 border="">Create Problem</TypographyH2>
        <TypographyMuted>Create a problem for users to play.</TypographyMuted>
      </header>
      <CreateProblemProvider>
        <CreateProblemError />
        <div className="flex flex-col gap-8 border-b pb-3">
          <CreateProblemTitle />
          <CreateProblemSlug />
          <CreateProblemRating />
          <CreateProblemQuestion />
        </div>
        <div className="flex flex-col gap-8">
          <CreateProblemInitialCode />
          <CreateProblemSolution />
          <CreateProblemTestSetup />
          <CreateProblemTestInputs />
        </div>
        <CreateProblemFooter />
      </CreateProblemProvider>
    </Card>
  );
};

export default CreateProblem;
