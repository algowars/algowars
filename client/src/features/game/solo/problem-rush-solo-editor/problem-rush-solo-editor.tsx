import { CodeEditor } from "@/components/code-editor/code-editor";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader } from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { ProblemRushSoloEditorScore } from "./problem-rush-solo-editor-score/problem-rush-solo-editor-score";
import { useFindSoloRushById } from "../../api/find-solo-rush-by-id";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import { isAxiosError } from "axios";

type ProblemRushSoloEditorProps = {
  rushId: string;
};

export const ProblemRushSoloEditor = ({
  rushId,
}: ProblemRushSoloEditorProps) => {
  const [code, setCode] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");
  const { getAccessTokenSilently } = useAuth0();

  const soloRushQuery = useFindSoloRushById({
    accessToken,
    rushId,
    startByDefault: true,
  });

  useEffect(() => {
    if (soloRushQuery.data?.initialCode) {
      setCode(soloRushQuery.data.initialCode);
    }
  }, [soloRushQuery?.data?.initialCode]);

  useEffect(() => {
    (async () => {
      if (!accessToken) {
        const token = await getAccessTokenSilently();
        setAccessToken(token);
      }
    })();
  }, [accessToken, getAccessTokenSilently]);

  useEffect(() => {
    if (soloRushQuery.isError) {
      let errorMessage: string;
      if (isAxiosError(soloRushQuery.error)) {
        errorMessage =
          soloRushQuery.error.response?.data?.message ||
          soloRushQuery.error.message;
      } else {
        errorMessage = (soloRushQuery.error as Error).message;
      }
      toast(`Error getting challenge: "${errorMessage}"`);
    }
  }, [soloRushQuery.error, soloRushQuery.isError]);

  function changeCode(newCode: string): void {
    setCode(newCode);
  }
  return (
    <div className="grow pb-5 px-2 lg:px-5">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={55} minSize={10}>
          <Card className="h-full max-h-full overflow-hidden bg-sidebar">
            <CardHeader className="p-2 border-b">
              <h4 className="font-semibold">Code</h4>
            </CardHeader>
            <CodeEditor
              code={code}
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
              <Card className="h-full overflow-auto flex flex-col bg-sidebar">
                <CardHeader className="p-2 border-b">
                  <h4 className="font-semibold">Description</h4>
                </CardHeader>
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
              <Card className="h-full overflow-auto bg-sidebar">
                <ProblemRushSoloEditorScore />
              </Card>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
