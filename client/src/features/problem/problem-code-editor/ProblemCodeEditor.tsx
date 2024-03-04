import Editor from "@monaco-editor/react";
import { useProblemCodeEditor } from "./ProblemCodeEditor.hooks";
import { useTheme } from "@/context/themeProvider";

type Props = {
  initialCode: string;
};

const ProblemCodeEditor = ({ initialCode }: Props) => {
  const { code, changeCode } = useProblemCodeEditor(initialCode);
  const { theme } = useTheme();
  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      value={code}
      onChange={changeCode}
      theme={`vs-${theme}`}
      className="border rounded"
    />
  );
};

export default ProblemCodeEditor;
