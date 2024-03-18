import CodeEditor from "@/components/code-editor/code-editor";
import { useProblemPlay } from "../problem-play.provider";

const ProblemPlayCodeEditor = () => {
  const { problemAggregate } = useProblemPlay();

  return (
    <CodeEditor
      code={problemAggregate?.initialCode ?? ""}
      className="rounded"
    />
  );
};

export default ProblemPlayCodeEditor;
