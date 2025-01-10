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
import { io, Socket } from "socket.io-client";
import { ProblemEditorResult } from "./problem-editor-result/problem-editor-result";
import { env } from "@/config/env";
import { LoginButton } from "@/components/auth/login-button";
import { SignupButton } from "@/components/auth/signup-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tag } from "lucide-react";
import { ProblemEditorTags } from "./problem-editor-tags/problem-editor-tags";
import { DifficultyBadge } from "@/components/difficulty-badge/difficulty-badge";

type ProblemEditorProps = {
  problem: Problem | undefined;
};

type SubmissionUpdate = {
  status: string;
  stdout: string[];
};

const socket: Socket = io(`${env.API_URL}/submission`, {
  autoConnect: false,
});

export const ProblemEditor = ({ problem }: ProblemEditorProps) => {
  const { getAccessTokenSilently } = useAuth0();
  const [code, setCode] = useState<string>("");
  const [submissionId, setSubmissionId] = useState<string>("");
  const { isAuthenticated } = useAuth0();
  const [submissionUpdate, setSubmissionUpdate] =
    useState<SubmissionUpdate | null>(null);

  const createSubmissionMutation = useCreateSubmission({
    mutationConfig: {
      onMutate: () => {
        toast.loading("Submitting your code...");
      },
      onSuccess: (data: string) => {
        if (data) {
          setSubmissionId(data);
        }
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

  useEffect(() => {
    if (!submissionId) {
      return;
    }

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("subscribeToSubmission", submissionId);

    const handleSubmissionUpdate = (data: SubmissionUpdate) => {
      setSubmissionUpdate(data);
    };

    socket.on("submissionUpdate", handleSubmissionUpdate);

    return () => {
      socket.off("submissionUpdate", handleSubmissionUpdate);
      socket.emit("unsubscribeFromSubmission", submissionId);
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, [submissionId]);

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
              <ResizablePanel
                defaultSize={submissionId ? 60 : 100}
                minSize={15}
              >
                <Card className="h-full bg-zinc-900 overflow-auto flex flex-col">
                  <div className="p-2 border-b bg-background">
                    <h4 className="font-semibold">Description</h4>
                  </div>
                  <div className="p-5">
                    <div className="mb-3">
                      <h2 className="text-2xl font-semibold mb-1">
                        {problem.title}
                      </h2>
                      <ul className="flex items-center gap-4">
                        <li>
                          <DifficultyBadge difficulty={problem.difficulty} />
                        </li>
                        <li>
                          <ProblemEditorCreatedBy
                            createdBy={problem.createdBy}
                          />
                        </li>
                      </ul>
                    </div>

                    {problem.question}
                  </div>
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
                        <ProblemEditorTags tags={problem.tags ?? []} />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <p className="text-muted-foreground p-5 text-sm">
                    &copy; 2025 Algowars
                  </p>
                </Card>
              </ResizablePanel>
              {submissionId ? (
                <ResizableHandle className="p-2 bg-inherit hover:bg-muted" />
              ) : null}
              <ResizablePanel
                defaultSize={submissionId ? 40 : 0}
                minSize={submissionId ? 40 : 0}
              >
                <Card className="h-full overflow-auto bg-zinc-900">
                  <ProblemEditorResult
                    submissionId={submissionId}
                    submissionUpdate={submissionUpdate}
                  />
                </Card>
              </ResizablePanel>
              {!isAuthenticated ? (
                <ResizablePanel defaultSize={20} minSize={20} className="mt-4">
                  <Card className="bg-zinc-900 p-5 h-full flex flex-col gap-5 overflow-auto">
                    <p className="text-semibold">
                      You need to log in or setup your account to submit code
                    </p>
                    <ul className="flex gap-5 items-center">
                      <li>
                        <LoginButton variant="default" className="w-28" />
                      </li>
                      <li>
                        <SignupButton variant="secondary" className="w-28" />
                      </li>
                    </ul>
                  </Card>
                </ResizablePanel>
              ) : null}
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <ProblemEditorFooter
        onSubmit={createSubmission}
        submissionUpdate={submissionUpdate}
        createSubmissionMutation={createSubmissionMutation}
      />
    </>
  );
};
