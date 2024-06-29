import { Card } from "@/components/ui/card";
import TypographyH1 from "@/components/ui/typography/typography-h1";
import { SubmissionResult } from "@/features/submission-result/models/submission-result.model";

type Props = {
  submissionResult: SubmissionResult | null;
};

const ProblemEditorSubmissionResult = ({ submissionResult }: Props) => {
  if (!submissionResult) {
    return null;
  }

  return (
    <Card>
      <TypographyH1>RESULTS</TypographyH1>
      <p>{JSON.stringify(submissionResult)}</p>
    </Card>
  );
};

export default ProblemEditorSubmissionResult;
