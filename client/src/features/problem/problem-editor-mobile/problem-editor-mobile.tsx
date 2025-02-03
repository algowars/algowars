import { SubmissionUpdate } from "../problem-editor/problem-editor";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { CodeEditor } from "@/components/code-editor/code-editor";
import { Problem } from "../models/problem.model";
import { Button } from "@/components/ui/button";
import { DifficultyBadge } from "@/components/difficulty-badge/difficulty-badge";
import { ProblemEditorCreatedBy } from "../problem-editor/problem-editor-createdby/problem-editor-createdby";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tag } from "lucide-react";
import { ProblemEditorTags } from "../problem-editor/problem-editor-tags/problem-editor-tags";
import { MobileProblemEditorFooter } from "./problem-editor-mobile-footer/problem-editor-mobile-footer";
import { UseMutationResult } from "@tanstack/react-query";

type ProblemEditorMobileProps = {
  problem: Problem | undefined;
  createSubmission: () => void;
  code: string;
  changeCode: (value: string) => void;
  submissionId: string;
  createSubmissionMutation: UseMutationResult<
    string,
    Error,
    {
      data: {
        sourceCode: string;
        problemSlug: string;
        languageId?: number;
      };
      accessToken: string;
    },
    unknown
  >;
  submissionUpdate: SubmissionUpdate | null;
  setSubmissionUpdate: Dispatch<SetStateAction<SubmissionUpdate | null>>;
};

export const ProblemEditorMobile = ({
  problem,
  createSubmission,
  code,
  changeCode,
  submissionUpdate,
  createSubmissionMutation,
}: ProblemEditorMobileProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, offsetWidth } = scrollContainerRef.current;
      const index = Math.round(scrollLeft / offsetWidth);
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToPanel = (index: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: index * window.innerWidth,
        behavior: "smooth",
      });
    }
  };

  if (!problem) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen">
      <div
        ref={scrollContainerRef}
        className="flex flex-row h-full overflow-x-auto scroll-smooth snap-x snap-mandatory"
      >
        <div className="flex-shrink-0 w-screen h-full snap-start">
          <CodeEditor code={code} changeCode={changeCode} className="h-full" />
        </div>
        <div className="flex-shrink-0 w-screen h-full snap-start overflow-auto">
          <div className="h-full dark:bg-zinc-900 overflow-auto flex flex-col border-none">
            <div className="p-5">
              <div className="mb-3">
                <h2 className="text-2xl font-semibold mb-1">{problem.title}</h2>
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
            <Accordion type="single" collapsible className="mt-auto border-t">
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
        </div>
      </div>

      <div className="relative flex justify-around items-center p-1 border-t w-screen">
        <Button
          onClick={() => scrollToPanel(0)}
          variant={activeIndex === 0 ? "default" : "secondary"}
          className="w-64"
        >
          Editor
        </Button>
        <Button
          onClick={() => scrollToPanel(1)}
          variant={activeIndex === 1 ? "default" : "secondary"}
          className="w-64"
        >
          Viewer
        </Button>
      </div>
      <MobileProblemEditorFooter
        onSubmit={createSubmission}
        createSubmissionMutation={createSubmissionMutation}
        submissionUpdate={submissionUpdate}
      />
    </div>
  );
};
