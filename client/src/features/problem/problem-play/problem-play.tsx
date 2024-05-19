import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useProblemPlay } from "./problem-play.provider";
import ProblemPlayQuestion from "./problem-play-question/problem-play-question";
import ProblemPlayCodeEditor from "./problem-play-code-editor/problem-play-code-editor";
import ProblemPlayFooter from "./problem-play-footer/problem-play-footer";
import ProblemPlayTestResults from "./problem-play-test-results/problem-play-test-results";
import LoaderAlert from "@/components/loader/loader-alert/loader-alert";

const ProblemPlay = () => {
  const { isSubmissionPending } = useProblemPlay();
  return (
    <div className="flex flex-col h-full">
      <LoaderAlert
        title="Loading Submission"
        description="Waiting for test cases to finish"
        isLoading={isSubmissionPending}
      />
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full grow p-5 gap-3"
      >
        <ResizablePanel
          defaultSize={55}
          className="overflow-hidden border flex flex-col rounded"
        >
          <div className="p-3 border-b">
            <h4 className="font-semibold">Solution</h4>
          </div>
          <div className="grow">
            <ProblemPlayCodeEditor />
          </div>
        </ResizablePanel>
        <ResizableHandle className="bg-background" />
        <ResizablePanel defaultSize={45} className="overflow-hidden">
          <ResizablePanelGroup direction="vertical" className="gap-3">
            <ResizablePanel
              defaultSize={70}
              className="overflow-auto border rounded flex flex-col"
            >
              <div className="p-3 border-b">
                <h4 className="font-semibold">Question</h4>
              </div>
              <ProblemPlayQuestion />
            </ResizablePanel>
            <ResizableHandle className="bg-background" />
            <ResizablePanel
              defaultSize={30}
              className="overflow-auto border rounded flex flex-col"
            >
              <div className="p-3 border-b">
                <h4 className="font-semibold">Submission</h4>
              </div>
              <ProblemPlayTestResults />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
      <ProblemPlayFooter />
    </div>
  );
};

export default ProblemPlay;
