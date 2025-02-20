import { Problem } from "../models/problem.model";
import { ProblemEditorCreatedBy } from "./problem-editor-createdby/problem-editor-createdby";
import { useCreateSubmission } from "@/features/submission/api/create-submission";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import { io, Socket } from "socket.io-client";
import { env } from "@/config/env";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CodeXml, FileText, FlaskConical, Tag } from "lucide-react";
import { ProblemEditorTags } from "./problem-editor-tags/problem-editor-tags";
import { DifficultyBadge } from "@/components/difficulty-badge/difficulty-badge";
import { Editor, Tab } from "@/components/editor/editor";
import { CodeEditor } from "@/components/code-editor/code-editor";
import AuthenticatedComponent from "@/components/auth/authenticated-component/authenticated-component";
import { ProblemEditorTestsTab } from "./problem-editor-tests/problem-editor-tests-tab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePollHorizontal } from "@fortawesome/free-solid-svg-icons";
import { ProblemEditorFooter } from "./problem-editor-footer/problem-editor-footer";
import { ProblemEditorResult } from "./problem-editor-result/problem-editor-result";

export type ProblemEditorProps = {
  problem: Problem | undefined;
};

export type SubmissionUpdate = {
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

  const tabs: Tab = {
    direction: "horizontal",
    children: [
      {
        name: "Code",
        key: "code",
        defaultSize: 55,
        icon: (
          <CodeXml size={16} className="text-green-600 dark:text-green-400" />
        ),
        component: (
          <CodeEditor
            code={code}
            changeCode={changeCode}
            className="h-full overflow-auto"
          />
        ),
      },
      {
        direction: "vertical",
        defaultSize: 45,
        children: [
          {
            component: (
              <div className="h-full bg-sidebar overflow-auto flex flex-col">
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
                        <ProblemEditorCreatedBy createdBy={problem.createdBy} />
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
              </div>
            ),
            key: "description",
            name: "Description",
            defaultSize: 70,
            icon: (
              <FileText
                size={16}
                className="text-blue-600 dark:text-blue-400"
              />
            ),
          },
          {
            name: "extras",
            key: "extras",
            children: [
              {
                name: "Test Cases",
                key: "test-cases",
                icon: (
                  <FlaskConical
                    size={16}
                    className="text-yellow-600 dark:text-yellow-400"
                  />
                ),
                defaultSize: 30,
                component: (
                  <AuthenticatedComponent>
                    <ProblemEditorTestsTab tests={problem.tests ?? []} />
                  </AuthenticatedComponent>
                ),
              },
              {
                name: "Test Results",
                key: "test-results",
                icon: (
                  <FontAwesomeIcon
                    icon={faSquarePollHorizontal}
                    size="sm"
                    className="text-purple-600 dark:text-purple-400"
                  />
                ),
                component: submissionId ? (
                  <ProblemEditorResult
                    submissionId={submissionId}
                    submissionUpdate={submissionUpdate}
                  />
                ) : (
                  <div className="p-5">
                    <p className="text-muted-foreground">
                      No Results Available
                    </p>
                  </div>
                ),
              },
            ],
          },
        ],
      },
    ],
  };

  console.log("TABS: ", tabs);

  return (
    <div className="grow pb-3 px-2 lg:px-5">
      <Editor tabs={tabs} />
      <ProblemEditorFooter
        onSubmit={createSubmission}
        submissionUpdate={submissionUpdate}
        createSubmissionMutation={createSubmissionMutation}
      />
    </div>
  );
};
