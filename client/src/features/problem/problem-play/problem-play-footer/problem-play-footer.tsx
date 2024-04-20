import { Button } from "@/components/ui/button";
import { useProblemPlay } from "../problem-play.provider";

const ProblemPlayFooter = () => {
  const { runTests, submitCode, isSubmissionPending } = useProblemPlay();
  return (
    <>
      <div className="border-t p-3 flex items-center gap-5">
        <ul className="flex gap-3 items-center ml-auto">
          <li>
            <Button
              className="w-24"
              variant="outline"
              disabled={isSubmissionPending}
              onClick={() => runTests()}
            >
              {isSubmissionPending ? "Loading..." : "Run"}
            </Button>
          </li>
          <li>
            <Button
              disabled={isSubmissionPending}
              onClick={() => submitCode()}
              className="w-28"
            >
              {/* <Lock size={17} className="mr-3" /> */}
              {isSubmissionPending ? "Loading..." : "Submit"}
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProblemPlayFooter;
