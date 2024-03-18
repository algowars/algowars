import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ProblemProvider } from "./problem-play.provider";
import ProblemPlayQuestion from "./problem-play-question/problem-play-question";
import ProblemPlayCodeEditor from "./problem-play-code-editor/problem-play-code-editor";

type Props = {
  slug: string;
};

const ProblemPlay = ({ slug }: Props) => {
  return (
    <div className="flex flex-col h-full">
      <ProblemProvider slug={slug}>
        <ResizablePanelGroup direction="horizontal" className="w-full grow">
          <ResizablePanel defaultSize={55}>
            <ProblemPlayCodeEditor />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={45}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={70} className="overflow-auto">
                <ProblemPlayQuestion />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={30}>
                <p>TEST CASES</p>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
        <div className="border-t p-5">
          <p>FOOTER</p>
        </div>
      </ProblemProvider>
    </div>
  );
};

export default ProblemPlay;
