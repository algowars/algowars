import Editor from "@monaco-editor/react";
import { useProblemCodeEditor } from "./ProblemCodeEditor.hooks";

type Props = {
  initialCode: string;
};

const ProblemCodeEditor = ({ initialCode }: Props) => {
  const { code, changeCode } = useProblemCodeEditor(initialCode);
  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      value={code}
      onChange={changeCode}
      theme="vs-dark"
    />
  );
};

export default ProblemCodeEditor;
