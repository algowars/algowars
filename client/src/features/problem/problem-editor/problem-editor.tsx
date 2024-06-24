import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ProblemEditorQuestion from "./problem-editor-question/problem-editor-question";
import CodeEditor from "@/components/code-editor/code-editor";
import { Card } from "@/components/ui/card";
import ProblemEditorTestcases from "./problem-editor-testcases/problem-editor-testcases";
import { ProblemAggregate } from "../models/problem-aggregate.model";
import { useProblemEditor } from "./problem-editor.provider";

type Props = {
  problemAggregate: ProblemAggregate;
};

const ProblemEditor = ({ problemAggregate }: Props) => {
  const { sourceCode, changeSourceCode } = useProblemEditor();
  return (
    <ResizablePanelGroup direction="horizontal" className="w-full">
      <ResizablePanel defaultSize={55}>
        <Card className="overflow-hidden h-full">
          <CodeEditor
            code={sourceCode}
            changeCode={changeSourceCode}
            className="h-full"
          />
        </Card>
      </ResizablePanel>
      <ResizableHandle className="px-2 bg-inherit" />
      <ResizablePanel defaultSize={45}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={75}>
            <ProblemEditorQuestion
              problem={problemAggregate.problem}
              className="bg-muted/40"
            />
          </ResizablePanel>
          <ResizableHandle className="py-2 bg-inherit" />
          <ResizablePanel defaultSize={25}>
            <ProblemEditorTestcases
              tests={problemAggregate.testCases}
              className="bg-muted/40"
              inputClassName="bg-muted/50"
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ProblemEditor;
