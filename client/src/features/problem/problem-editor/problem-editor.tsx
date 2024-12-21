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
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type ProblemEditorProps = {
  problem: Problem | undefined;
};

export const ProblemEditor = ({ problem }: ProblemEditorProps) => {
  const { getAccessTokenSilently } = useAuth0();
  const [code, setCode] = useState<string>("");
  const navigate = useNavigate();
  const createSubmissionMutation = useCreateSubmission({
    mutationConfig: {
      onMutate: () => {
        toast.loading("Submitting your code...");
      },
      onSuccess: () => {
        navigate("solutions");
      },
      onError: (error: unknown) => {
        toast.dismiss();
        toast.error(`Submission failed: "${error}"`);
      },
    },
  });

  useEffect(() => {
    if (problem?.initialCode) {
      setCode(problem?.initialCode);
    }
  }, [problem?.initialCode]);

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
      <div className="grow pb-5 px-2 lg:px-5">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={55} minSize={10}>
            <Card className="h-full overflow-auto">
              <div className="p-2 border-b">
                <h4 className="font-semibold">Code</h4>
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
              <ResizablePanel defaultSize={100} minSize={15}>
                <Card className="h-full bg-zinc-900 overflow-auto">
                  <div className="p-2 border-b bg-background">
                    <h4 className="font-semibold">Description</h4>
                  </div>
                  <div className="p-5">
                    <div className="mb-3">
                      <h2 className="text-2xl font-semibold mb-1">
                        {problem.title}
                      </h2>
                      <ProblemEditorCreatedBy createdBy={problem.createdBy} />
                    </div>

                    {problem.question}
                  </div>
                </Card>
              </ResizablePanel>
              {/* <ResizableHandle className="p-3 bg-inherit hover:bg-muted" /> */}
              <ResizablePanel defaultSize={0}>
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
