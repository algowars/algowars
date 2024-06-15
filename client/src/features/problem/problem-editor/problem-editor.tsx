import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ProblemAggregate } from "../models/problem-aggregate.model";
import ProblemEditorQuestion from "./problem-editor-question/problem-editor-question";
import CodeEditor from "@/components/code-editor/code-editor";
import { Card } from "@/components/ui/card";
import ProblemEditorTestcases from "./problem-editor-testcases/problem-editor-testcases";

type Props = {
  problemAggregate: ProblemAggregate;
};

const ProblemEditor = ({ problemAggregate }: Props) => {
  const changeCode = (value: string) => {};
  return (
    <ResizablePanelGroup direction="horizontal" className="w-full">
      <ResizablePanel defaultSize={55}>
        <Card className="overflow-hidden h-full">
          <CodeEditor
            code={problemAggregate.initialCode}
            changeCode={changeCode}
            className="h-full"
          />
        </Card>
      </ResizablePanel>
      <ResizableHandle className="px-2 bg-inherit" />
      <ResizablePanel defaultSize={45}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={75}>
            <ProblemEditorQuestion problem={problemAggregate.problem} />
          </ResizablePanel>
          <ResizableHandle className="py-2 bg-inherit" />
          <ResizablePanel defaultSize={25}>
            <ProblemEditorTestcases tests={problemAggregate.testCases} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ProblemEditor;
