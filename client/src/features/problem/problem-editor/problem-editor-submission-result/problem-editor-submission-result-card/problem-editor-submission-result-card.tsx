import TypographyMuted from "@/components/ui/typography/typography-muted";
import Status from "@/features/status/status";
import { SubmissionResultTestcase } from "@/features/submission-result/models/submission-result-testcase";
import SubmissionResultError from "@/features/submission-result/submission-result-error/submission-result-error";

type Props = {
  testcase: SubmissionResultTestcase;
};

const ProblemEditorSubmissionResultCard = ({ testcase }: Props) => {
  if (!testcase) {
    return null;
  }

  console.log(testcase);

  return (
    <div>
      <div className="p-5 flex flex-col gap-3">
        <Status statusId={testcase.statusId} />
        <SubmissionResultError error={testcase.stderr} />
      </div>
      <div className="p-5 flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <TypographyMuted>Input</TypographyMuted>
          <p className="p-3 bg-muted rounded">{testcase.stdin}</p>
        </div>
        <div className="flex flex-col gap-3">
          <TypographyMuted>Output</TypographyMuted>
          <p className="p-3 bg-muted rounded">{testcase.stdout}</p>
        </div>
        <div className="flex flex-col gap-3">
          <TypographyMuted>Expected</TypographyMuted>
          <p className="p-3 bg-muted rounded">{testcase.expectedOutput}</p>
        </div>
      </div>
    </div>
  );
};

export default ProblemEditorSubmissionResultCard;
