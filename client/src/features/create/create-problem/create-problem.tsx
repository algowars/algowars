import { Button } from "@/components/ui/button";
import CreateProblemMetadata from "./create-problem-metadata/create-problem-metadata";
import CreateProblemQuestion from "./create-problem-question/create-problem-question";
import CreateProblemSetup from "./create-problem-setup/create-problem-setup";
import CreateProblemTest from "./create-problem-test/create-problem-test";
import { useMutation } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { useCreateProblem } from "./create-problem.provider";
import { problemService } from "@/features/problem/services/problem.service";
import ErrorAlertFixed from "@/errors/error-alert-fixed/error-alert-fixed";
import CreateProblemSolution from "./create-problem-solution/create-problem-solution";

const CreateProblem = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { createProblem } = useCreateProblem();

  const {
    mutate: submitProblem,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["create-problem"],
    mutationFn: async () => {
      const accessToken = await getAccessTokenSilently();

      return problemService.createProblem(accessToken, createProblem);
    },
  });
  return (
    <div className="flex flex-col gap-5">
      <ErrorAlertFixed error={error} showClose />
      <div className="p-5 grow">
        <section className="grid grid-cols-12 gap-x-5 gap-y-6">
          <div className="col-span-6">
            <h4 className="font-semibold mb-3">Metadata</h4>
            <CreateProblemMetadata />
          </div>
          <div className="col-span-6">
            <h4 className="font-semibold mb-3">Question</h4>
            <CreateProblemQuestion />
          </div>
          <div className="col-span-6">
            <h4 className="font-semibold mb-3">Problem Setup</h4>
            <CreateProblemSetup />
          </div>
          <div className="col-span-6">
            <div className="mb-3">
              <h4 className="font-semibold">Tests</h4>
              <p className="text-muted-foreground">
                Inputs should be seperated by a comma.
              </p>
            </div>
            <CreateProblemTest />
          </div>
          <div className="col-span-6">
            <h4 className="font-semibold mb-3">Problem Solution</h4>
            <CreateProblemSolution />
          </div>
        </section>
      </div>
      <section className="border-t p-5">
        <Button
          disabled={isPending}
          className="w-32"
          onClick={() => submitProblem()}
        >
          {isPending ? "Loading..." : "Create Problem"}
        </Button>
      </section>
    </div>
  );
};

export default CreateProblem;
