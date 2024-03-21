import { Button } from "@/components/ui/button";
import { submissionService } from "@/features/submission/services/submission.service";
import { useMutation } from "@tanstack/react-query";
import { useProblemPlay } from "../problem-play.provider";
import ErrorAlertFixed from "@/errors/error-alert-fixed/error-alert-fixed";

const ProblemPlayFooter = () => {
  const { createSubmissionDto } = useProblemPlay();
  const {
    mutate: submitCode,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["create-submission"],
    mutationFn: async () => {
      return submissionService.createSubmission(createSubmissionDto);
    },
  });
  return (
    <>
      <ErrorAlertFixed error={error} />
      <div className="border-t p-3 flex items-center gap-5">
        <ul className="flex gap-3 items-center ml-auto">
          <li>
            <Button className="w-24" variant="outline">
              Run
            </Button>
          </li>
          <li>
            <Button
              disabled={isPending}
              onClick={() => submitCode()}
              className="w-28"
            >
              {/* <Lock size={17} className="mr-3" /> */}
              Submit
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProblemPlayFooter;
