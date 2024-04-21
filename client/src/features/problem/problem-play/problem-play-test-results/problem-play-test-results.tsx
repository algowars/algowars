import TestResults from "@/features/test-results/test-results";
import { useProblemPlay } from "../problem-play.provider";

const ProblemPlayTestResults = () => {
  const { submissionAggregate } = useProblemPlay();

  return submissionAggregate?.judgeSubmissions ? (
    <TestResults judgeSubmissions={submissionAggregate.judgeSubmissions} />
  ) : (
    <div className="flex justify-center items-center h-full">
      <p className="font-semibold p-3">No Submission Available</p>
    </div>
  );
};

export default ProblemPlayTestResults;
