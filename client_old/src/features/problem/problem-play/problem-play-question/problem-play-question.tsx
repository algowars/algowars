import ErrorAlertFixed from "@/errors/error-alert-fixed/error-alert-fixed";
import { useProblemPlay } from "../problem-play.provider";
import MarkdownViewer from "@/components/markdown-viewer/markdown-viewer";
import TypographyH4 from "@/components/ui/typography/typography-h4";
import ProblemPlayQuestionMetadata from "./problem-play-question-metadata/problem-play-question-metadata";

const ProblemPlayQuestion = () => {
  const { problemAggregate, error } = useProblemPlay();

  if (!problemAggregate?.problem.question) {
    return (
      <>
        <ErrorAlertFixed error={error} />
        <div className="flex justify-center items-center h-full">
          <p className="font-semibold">Problem Not Found</p>
        </div>
      </>
    );
  }
  return (
    <>
      <ErrorAlertFixed error={error} />
      <div className="p-3 overflow-y-auto h-full">
        {problemAggregate ? (
          <ProblemPlayQuestionMetadata problemAggregate={problemAggregate} />
        ) : null}

        <div
          data-orientation="horizontal"
          role="none"
          className="shrink-0 bg-border h-[1px] w-full my-6"
        ></div>
        <div>
          <MarkdownViewer markdown={problemAggregate.problem.question} />
        </div>
      </div>
    </>
  );
};

export default ProblemPlayQuestion;
