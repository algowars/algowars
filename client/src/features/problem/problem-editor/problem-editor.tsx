import { CodeEditor } from "@/components/code-editor/code-editor";
import { Card } from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Problem } from "../models/problem.model";
import { ProblemEditorCreatedBy } from "./problem-editor-createdby/problem-editor-createdby";
import { ProblemEditorFooter } from "./problem-editor-footer/problem-editor-footer";
import { useCreateSubmission } from "@/features/submission/api/create-submission";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

type ProblemEditorProps = {
  problem: Problem | undefined;
};

export const ProblemEditor = ({ problem }: ProblemEditorProps) => {
  const { getAccessTokenSilently } = useAuth0();
  const [code, setCode] = useState<string>("");
  const createSubmissionMutation = useCreateSubmission();

  if (!problem) {
    return null;
  }

  const changeCode = (newCode: string) => {
    setCode(newCode);
  };

  const createSubmission = async () => {
    const accessToken = await getAccessTokenSilently();

    createSubmissionMutation.mutate({
      data: {
        sourceCode: code,
        problemSlug: problem.slug,
        languageId: 93,
      },
      accessToken,
    });
  };

  return (
    <>
      <div className="grow pb-5 px-5">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={55} minSize={10}>
            <Card className="h-full overflow-auto">
              <div className="p-5 border-b">
                <h4 className="text-xl font-semibold">Code</h4>
              </div>
              <CodeEditor
                code={code}
                changeCode={changeCode}
                className="h-full"
              />
            </Card>
          </ResizablePanel>
          <ResizableHandle className="p-2 bg-inherit hover:bg-muted" />
          <ResizablePanel defaultSize={45} minSize={10}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={80} minSize={15}>
                <Card className="h-full">
                  <div className="p-5 border-b">
                    <h2 className="text-2xl font-semibold">{problem.title}</h2>
                    <ProblemEditorCreatedBy createdBy={problem.createdBy} />
                  </div>
                  <div className="p-5">{problem.question}</div>
                </Card>
              </ResizablePanel>
              <ResizableHandle className="p-3 bg-inherit hover:bg-muted" />
              <ResizablePanel defaultSize={20} minSize={15}>
                <Card className="h-full">
                  <div className="p-5 border-b">
                    <h2 className="text-2xl font-semibold">{problem.title}</h2>
                    <ProblemEditorCreatedBy createdBy={problem.createdBy} />
                  </div>
                  <div className="p-5">{problem.question}</div>
                </Card>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <ProblemEditorFooter onSubmit={createSubmission} />
    </>
  );
};
