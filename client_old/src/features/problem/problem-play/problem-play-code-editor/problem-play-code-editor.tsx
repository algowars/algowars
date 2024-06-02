import CodeEditor from "@/components/code-editor/code-editor";
import { useProblemPlay } from "../problem-play.provider";

const ProblemPlayCodeEditor = () => {
  const { createSubmissionDto, changeCreateSubmissionDto } = useProblemPlay();

  const changeCode = (value: string | undefined) => {
    changeCreateSubmissionDto("code", value ?? "");
  };

  return (
    <CodeEditor
      code={createSubmissionDto.code}
      className="h-full"
      changeCode={changeCode}
    />
  );
};

export default ProblemPlayCodeEditor;
