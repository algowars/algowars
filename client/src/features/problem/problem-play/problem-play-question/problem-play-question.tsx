import ErrorAlertFixed from "@/errors/error-alert-fixed/error-alert-fixed";
import { useProblemPlay } from "../problem-play.provider";
import MarkdownViewer from "@/components/markdown-viewer/markdown-viewer";

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
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {problemAggregate.problem.id}. {problemAggregate.problem.title}
        </h3>
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
