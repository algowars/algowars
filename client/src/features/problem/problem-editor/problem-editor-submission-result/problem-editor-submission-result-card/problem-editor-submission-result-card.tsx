import TypographyMuted from "@/components/ui/typography/typography-muted";
import Status from "@/features/status/status";
import { SubmissionResultTestcase } from "@/features/submission-result/models/submission-result-testcase";

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
      <div className="p-5">
        <Status statusId={testcase.statusId} />
      </div>
      <div className="p-5 flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <TypographyMuted>Output</TypographyMuted>
          <p className="p-3 bg-muted rounded">{testcase.stdout}</p>
        </div>
        <div className="flex flex-col gap-3">
          <TypographyMuted>Expected</TypographyMuted>
          <p className="p-3 bg-muted rounded">{testcase.stdout}</p>
        </div>
      </div>
    </div>
  );
};

export default ProblemEditorSubmissionResultCard;
