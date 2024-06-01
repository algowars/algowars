import { useState } from "react";
import { JudgeSubmission } from "../submission/judge-submission.model";
import TestResultsNav from "./test-results-nav/test-results-nav";
import TestResultsCard from "./test-results-card/test-results-card";

type Props = {
  judgeSubmissions: JudgeSubmission[];
};

const TestResults = ({ judgeSubmissions }: Props) => {
  const [currentTest, setCurrentTest] = useState<number>(0);

  const changeCurrentTest = (index: number) => {
    if (judgeSubmissions[index]) {
      setCurrentTest(index);
    }
  };
  const currentSubmission = judgeSubmissions[currentTest];

  return (
    <div className="p-2 overflow-auto h-full">
      <TestResultsNav
        currentTest={currentTest}
        changeCurrentTest={changeCurrentTest}
        judgeSubmissions={judgeSubmissions}
      />
      <TestResultsCard submission={currentSubmission} />
    </div>
  );
};

export default TestResults;
