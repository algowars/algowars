import Editor from "@monaco-editor/react";
import { useTheme } from "@/features/theme/theme.provider";

type Props = {
  code: string;
  changeCode?: (value: string | undefined) => void;
  className?: string;
};

const CodeEditor = ({
  code,
  changeCode,
  className = "border rounded",
}: Props) => {
  const { mode } = useTheme();
  let theme = mode;

  if (mode === "system") {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

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

export default CodeEditor;
