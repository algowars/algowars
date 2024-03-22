import { SubmissionStatusDescription } from "@/features/submission/judge-submission-status-description.model";
import { JudgeSubmission } from "@/features/submission/judge-submission.model";

type Props = {
  submission: JudgeSubmission;
};

const TestResultsStatus = ({ submission: { status } }: Props) => {
  const textColor =
    status.description === SubmissionStatusDescription.WRONG_ANSWER
      ? "text-red-600 dark:text-red-400"
      : status.description === SubmissionStatusDescription.ACCEPTED
      ? "text-green-600 dark:text-green-400"
      : "";
  return (
    <h3 className={`text-xl ${textColor} font-semibold`}>
      {status.description}
    </h3>
  );
};

export default TestResultsStatus;
