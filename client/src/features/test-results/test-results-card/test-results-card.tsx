import { JudgeSubmission } from "@/features/submission/judge-submission.model";
import TestResultsStatus from "../test-results-status/test-results-status";

type Props = {
  submission: JudgeSubmission | undefined;
};

const TestResultsCard = ({ submission }: Props) => {
  if (!submission) {
    return null;
  }
  return (
    <div className="flex flex-col gap-5 h-full overflow-y-auto">
      <div className="flex items-center gap-5 rounded">
        <TestResultsStatus submission={submission} />
        <p className="text-muted-foreground">Runtime: {submission.time} ms</p>
      </div>
      {submission.stderr ? (
        <div className="p-3 bg-accent flex flex-col gap-2 rounded">
          <p>Error</p>
          <p>{submission.stderr}</p>
        </div>
      ) : null}
      <div className="p-3 bg-accent flex flex-col gap-2 rounded">
        <p>Input</p>
        <p>{submission.stdin}</p>
      </div>
      <div className="p-3 bg-accent flex flex-col gap-2 rounded">
        <p>Expected Output</p>
        <p>{submission.expected_output}</p>
      </div>
      <div className="p-3 bg-accent flex flex-col gap-2 rounded">
        <p>Actual Output</p>
        <p>{submission.stdout}</p>
      </div>
    </div>
  );
};

export default TestResultsCard;
