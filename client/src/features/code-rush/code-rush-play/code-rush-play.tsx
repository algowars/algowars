import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CodeRushPlayProgress from "./code-rush-play-progress/code-rush-play-progress";
import TypographyH4 from "@/components/ui/typography/typography-h4";
import CodeEditor from "@/components/code-editor/code-editor";
import ProblemPlayQuestion from "@/features/problem/problem-play/problem-play-question/problem-play-question";
import ProblemPlayTestResults from "@/features/problem/problem-play/problem-play-test-results/problem-play-test-results";

const CodeRushPlay = () => {
  return (
    <div className="flex flex-col h-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full grow p-5 gap-3"
      >
        <ResizablePanel
          defaultSize={30}
          className="overflow-hidden border flex flex-col rounded"
        >
          <div className="p-3 border-b">
            <TypographyH4>Info</TypographyH4>
          </div>
          <div className="grow">
            <CodeRushPlayProgress />
          </div>
        </ResizablePanel>
        <ResizableHandle className="bg-background" />
        <ResizablePanel
          defaultSize={40}
          className="overflow-hidden border flex flex-col rounded"
        >
          <div className="p-3 border-b">
            <TypographyH4>Solution</TypographyH4>
          </div>
          <CodeEditor code="" />
        </ResizablePanel>
        <ResizableHandle className="bg-background" />
        <ResizablePanel defaultSize={30} className="overflow-hidden">
          <ResizablePanelGroup direction="vertical" className="gap-3 h-full">
            <ResizablePanel
              defaultSize={70}
              className="overflow-auto border rounded flex flex-col h-full"
            >
              <div className="p-3 border-b">
                <h4 className="font-semibold">Question</h4>
              </div>
              {/* <ProblemPlayQuestion /> */}
            </ResizablePanel>
            <ResizableHandle className="bg-background" />
            {/* <ResizablePanel
              defaultSize={30}
              className="overflow-auto border rounded flex flex-col h-full"
            >
              <div className="p-3 border-b">
                <h4 className="font-semibold">Submission</h4>
              </div>
              {/* <ProblemPlayTestResults />
            </ResizablePanel> */}
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default CodeRushPlay;
