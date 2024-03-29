import { Button } from "@/components/ui/button";
import { submissionService } from "@/features/submission/services/submission.service";
import { useMutation } from "@tanstack/react-query";
import { useProblemPlay } from "../problem-play.provider";
import ErrorAlertFixed from "@/errors/error-alert-fixed/error-alert-fixed";
import { useSocket } from "@/common/socket/socket.provider";
import { useAuth0 } from "@auth0/auth0-react";

const ProblemPlayFooter = () => {
  const { createSubmissionDto } = useProblemPlay();
  const { socket } = useSocket();
  const { getAccessTokenSilently } = useAuth0();
  const { setSubmission, isSubmissionPending } = useProblemPlay();
  const {
    mutate: submitCode,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["create-submission"],
    mutationFn: async () => {
      const accessToken = await getAccessTokenSilently();
      const submission = await submissionService.createSubmission(
        accessToken,
        createSubmissionDto
      );

      if (!submission) {
        throw new Error("Error creating submission");
      }

      socket?.emit("startSubmissionPolling", { submissionId: submission.id });

      setSubmission(submission);
    },
  });
  return (
    <>
      <ErrorAlertFixed error={error} />
      <div className="border-t p-3 flex items-center gap-5">
        <ul className="flex gap-3 items-center ml-auto">
          <li>
            <Button
              className="w-24"
              variant="outline"
              disabled={isSubmissionPending}
            >
              {isPending || isSubmissionPending ? "Loading..." : "Run"}
            </Button>
          </li>
          <li>
            <Button
              disabled={isPending || isSubmissionPending}
              onClick={() => submitCode()}
              className="w-28"
            >
              {/* <Lock size={17} className="mr-3" /> */}
              {isPending || isSubmissionPending ? "Loading..." : "Submit"}
            </Button>
          </li>
        </ul>
        {JSON.stringify(
          `isPending: ${isPending} isSubmissionPending: ${isSubmissionPending}`
        )}
      </div>
    </>
  );
};

export default ProblemPlayFooter;
