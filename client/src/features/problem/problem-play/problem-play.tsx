import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ProblemProvider, useProblemPlay } from "./problem-play.provider";
import ProblemPlayQuestion from "./problem-play-question/problem-play-question";
import ProblemPlayCodeEditor from "./problem-play-code-editor/problem-play-code-editor";
import ProblemPlayFooter from "./problem-play-footer/problem-play-footer";
import ProblemPlayTestResults from "./problem-play-test-results/problem-play-test-results";
import LoaderAlert from "@/components/loader/loader-alert/loader-alert";

type Props = {
  slug: string;
};

const ProblemPlay = ({ slug }: Props) => {
  const { isSubmissionPending } = useProblemPlay();
  return (
    <div className="flex flex-col h-full">
      <LoaderAlert
        title="Loading Submission"
        description="Waiting for test cases to finish"
        isLoading={isSubmissionPending}
      />
      <ProblemProvider slug={slug}>
        <ResizablePanelGroup direction="horizontal" className="w-full grow">
          <ResizablePanel defaultSize={55} className="overflow-hidden">
            <ProblemPlayCodeEditor />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={45} className="overflow-hidden">
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={70} className="overflow-auto">
                <ProblemPlayQuestion />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={30} className="overflow-y-scroll">
                <ProblemPlayTestResults />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
        <ProblemPlayFooter />
      </ProblemProvider>
    </div>
  );
};

export default ProblemPlay;
