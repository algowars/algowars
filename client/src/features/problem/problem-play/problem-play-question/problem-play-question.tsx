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
      <div className="p-3 overflow-y-auto flex flex-col gap-5 h-full">
        <h1 className="text-xl font-semibold">
          {problemAggregate.problem.id}. {problemAggregate.problem.title}
        </h1>
        <div>
          <MarkdownViewer markdown={problemAggregate.problem.question} />
        </div>
      </div>
    </>
  );
};

export default ProblemPlayQuestion;
