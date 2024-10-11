import { CodeEditor } from "@/components/code-editor/code-editor";
import { Card } from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export const ProblemEditor = () => {
  return (
    <div className="grow pb-5 px-5">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={55}>
          <Card className="p-5">
            <CodeEditor
              code={"test"}
              changeCode={(newCode: string) => console.log(newCode)}
            />
          </Card>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={45}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={80}>
              <Card className="p-5">
                <span>TESTING</span>
              </Card>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={20} minSize={8}>
              <Card className="p-5">
                <span>TESTING</span>
              </Card>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
