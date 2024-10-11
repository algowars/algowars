import CodeMirror from "@uiw/react-codemirror";

import { useCallback } from "react";
import { useTheme } from "../theme/theme-provider";
import { langs, loadLanguage } from "@uiw/codemirror-extensions-langs";
import { vscodeDark, vscodeLight } from "./code-editor-themes/vscode";

type CodeEditorProps = {
  code: string;
  changeCode: (newCode: string) => void;
  className?: string;
};

export const CodeEditor = ({
  code,
  changeCode,
  className,
}: CodeEditorProps) => {
  const { getThemeWithSystem } = useTheme();

  const onChange = useCallback(changeCode, []);

  const theme = getThemeWithSystem() === "dark" ? vscodeDark : vscodeLight;

  loadLanguage("tsx");

  langs.tsx();

  return (
    <CodeMirror
      value={code}
      onChange={onChange}
      theme={theme}
      extensions={[langs.tsx()]}
      height="100%"
      className={className}
    />
  );
};
