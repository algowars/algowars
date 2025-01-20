import { CodeEditor } from "@/components/code-editor/code-editor";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tag } from "lucide-react";
import { useState } from "react";
import { ProblemRushSoloEditorScore } from "./problem-rush-solo-editor-score/problem-rush-solo-editor-score";

type ProblemRushSoloEditorProps = {
  rushId: string;
};

export const ProblemRushSoloEditor = ({
  rushId,
}: ProblemRushSoloEditorProps) => {
  const [code, setCode] = useState<string>("");

  function changeCode(newCode: string): void {
    setCode(newCode);
  }
  return (
    <div className="grow pb-5 px-2 lg:px-5">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={55} minSize={10}>
          <Card className="h-full max-h-full overflow-hidden">
            <div className="p-2 border-b">
              <h4 className="font-semibold">Code</h4>
            </div>
            <CodeEditor
              code={""}
              changeCode={changeCode}
              className="h-full overflow-auto"
            />
          </Card>
        </ResizablePanel>
        <ResizableHandle className="p-2 bg-inherit hover:bg-muted" />
        <ResizablePanel defaultSize={45} minSize={10}>
          <ResizablePanelGroup direction="vertical">
            {/* Add your content here */}
            <ResizablePanel defaultSize={60} minSize={15}>
              <Card className="h-full dark:bg-zinc-900 overflow-auto flex flex-col">
                <div className="p-2 border-b bg-background">
                  <h4 className="font-semibold">Description</h4>
                </div>
                {/* <div className="p-5">
                  <div className="mb-3">
                    <h2 className="text-2xl font-semibold mb-1">
                      {problem.title}
                    </h2>
                    <ul className="flex items-center gap-4">
                      <li>
                        <DifficultyBadge difficulty={problem.difficulty} />
                      </li>
                      <li>
                        <ProblemEditorCreatedBy createdBy={problem.createdBy} />
                      </li>
                    </ul>
                  </div> */}
                {/* </div> */}
                <Accordion
                  type="single"
                  collapsible
                  className="mt-auto border-t"
                >
                  <AccordionItem value="tags">
                    <AccordionTrigger className="p-5">
                      <span className="flex items-center gap-1">
                        <Tag size={16} /> Tags
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      {/* <ProblemEditorTags tags={problem.tags ?? []} /> */}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <p className="text-muted-foreground p-5 text-sm">
                  &copy; 2025 Algowars
                </p>
              </Card>
            </ResizablePanel>
            <ResizableHandle className="p-2 bg-inherit hover:bg-muted" />
            <ResizablePanel defaultSize={40} minSize={10}>
              <Card className="h-full dark:bg-zinc-900 overflow-auto">
                <ProblemRushSoloEditorScore />
              </Card>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
