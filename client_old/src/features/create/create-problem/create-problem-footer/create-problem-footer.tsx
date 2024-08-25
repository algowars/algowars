import { Button } from "@/components/ui/button";
import { useCreateProblem } from "../create-problem.provider";

const CreateProblemFooter = () => {
  const { submitProblem, isProblemSubmitLoading } = useCreateProblem();
  return (
    <div>
      <Button onClick={submitProblem} disabled={isProblemSubmitLoading}>
        Create Problem
      </Button>
    </div>
  );
};

export default CreateProblemFooter;
