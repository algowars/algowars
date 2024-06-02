import { Button } from "@/components/ui/button";
import { SubmissionStatusDescription } from "@/features/submission/judge-submission-status-description.model";
import { JudgeSubmission } from "@/features/submission/judge-submission.model";

type Props = {
  currentTest: number;
  changeCurrentTest: (value: number) => void;
  judgeSubmissions: JudgeSubmission[];
};

const TestResultsNav = ({ changeCurrentTest, judgeSubmissions }: Props) => {
  return (
    <ul className="flex items-center gap-3 overflow-x-auto w-full">
      {judgeSubmissions.map((submission, index) => (
        <li key={index}>
          <Button
            variant="ghost"
            className="flex items-center gap-3"
            onClick={() => changeCurrentTest(index)}
          >
            <span>Case {index}</span>
            <span
              className={`w-2 h-2 rounded-full ${
                submission.status.description ===
                SubmissionStatusDescription.ACCEPTED
                  ? "bg-green-600 dark:bg-green-400"
                  : "bg-red-600 dark:bg-red-400"
              }`}
            ></span>
          </Button>{" "}
        </li>
      ))}
    </ul>
  );
};

export default TestResultsNav;
