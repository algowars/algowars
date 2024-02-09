import { Button } from "@/components/ui/button";
import { SubmissionModel } from "@/models/SubmissionModel";
import { AvailableTabs } from "./AvailableTabs";
import { useProblemResult } from "./ProblemResult.hooks";
import ProblemTestcase from "../problem-testcase/ProblemTestcase";
import ProblemSubmission from "../problem-submission/ProblemSubmission";

type Props = {
  submission: SubmissionModel | null;
};

const ProblemResult = ({ submission }: Props) => {
  const { currentTab, changeTab } = useProblemResult(submission);

  return (
    <div>
      <ul className="p-1 border-b flex items-center gap-3">
        {Object.values(AvailableTabs).map((tab) => {
          if (tab === AvailableTabs.TEST_RESULTS) {
            return submission ? (
              <li key={tab}>
                <Button
                  variant="ghost"
                  className="text-sm py-1 px-2 h-7"
                  onClick={() => changeTab(tab)}
                >
                  {tab}
                </Button>
              </li>
            ) : null;
          }
          return (
            <li key={tab}>
              <Button
                variant="ghost"
                className="text-sm py-1 px-2 h-7"
                onClick={() => changeTab(tab)}
              >
                {tab}
              </Button>
            </li>
          );
        })}
      </ul>
      {currentTab === AvailableTabs.TEST_RESULTS ? (
        <ProblemSubmission submission={submission} />
      ) : (
        <ProblemTestcase />
      )}
    </div>
  );
};

export default ProblemResult;
