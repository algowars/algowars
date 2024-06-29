import { Card } from "@/components/ui/card";
import { SubmissionResult } from "@/features/submission-result/models/submission-result.model";
import { useState } from "react";
import ProblemEditorSubmissionResultNav from "./problem-editor-submission-result-nav/problem-editor-submission-result-nav";
import ProblemEditorSubmissionResultCard from "./problem-editor-submission-result-card/problem-editor-submission-result-card";
import { cn } from "@/lib/utils";

type Props = {
  submissionResult: SubmissionResult | null;
  className?: string;
};

const ProblemEditorSubmissionResult = ({
  submissionResult,
  className,
}: Props) => {
  const [currentResultIndex, setCurrentResultIndex] = useState<number>(0);

  if (!submissionResult) {
    return null;
  }

  const changeCurrentResultIndex = (newIndex: number) => {
    setCurrentResultIndex(newIndex);
  };

  return (
    <Card className={cn("h-full overflow-auto", className)}>
      <ProblemEditorSubmissionResultNav
        testcases={submissionResult.testcases ?? []}
        currentResultIndex={currentResultIndex}
        changeCurrentResultIndex={changeCurrentResultIndex}
      />
      <ProblemEditorSubmissionResultCard
        testcase={submissionResult.testcases[currentResultIndex]}
      />
    </Card>
  );
};

export default ProblemEditorSubmissionResult;
