import Editor from "@monaco-editor/react";
import { useTheme } from "@/context/themeProvider";

type Props = {
  code: string;
  changeCode: (value: string | undefined) => void;
  className?: string;
};

const ProblemCodeEditor = ({
  code,
  changeCode,
  className = "border rounded",
}: Props) => {
  const { theme } = useTheme();
  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      value={code}
      onChange={changeCode}
      theme={`vs-${theme}`}
      className={className}
    />
  );
};

export default ProblemCodeEditor;
