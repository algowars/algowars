import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ProblemProvider } from "./problem-play.provider";
import ProblemPlayQuestion from "./problem-play-question/problem-play-question";
import ProblemPlayCodeEditor from "./problem-play-code-editor/problem-play-code-editor";
import ProblemPlayFooter from "./problem-play-footer/problem-play-footer";

type Props = {
  slug: string;
};

const ProblemPlay = ({ slug }: Props) => {
  return (
    <div className="flex flex-col h-full py-2">
      <ProblemProvider slug={slug}>
        <ResizablePanelGroup direction="horizontal" className="w-full grow">
          <ResizablePanel defaultSize={55} className="rounded overflow-hidden">
            <ProblemPlayCodeEditor />
          </ResizablePanel>
          <ResizableHandle className="w-4 bg-background hover:bg-accent" />
          <ResizablePanel defaultSize={45} className="rounded overflow-hidden">
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={70} className="overflow-auto border">
                <ProblemPlayQuestion />
              </ResizablePanel>
              <ResizableHandle className="h-4 bg-background hover:bg-accent" />
              <ResizablePanel
                defaultSize={30}
                className="rounded overflow-hidden border"
              >
                <p>TEST CASES</p>
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
