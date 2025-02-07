import SyntaxHighlighter from "react-syntax-highlighter";
import { androidstudio } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useTheme } from "../theme/theme-provider";
import { vscodeLight } from "../code-editor/code-editor-themes/vscode/light";
import type { CSSProperties } from "react";

type CodeBlockProps = {
  code?: string;
  className?: string;
  language?: string;
};

export const CodeBlock = ({
  code = "",
  className = "",
  language = "javascript",
}: CodeBlockProps) => {
  const { getThemeWithSystem } = useTheme();
  const themeStyle =
    getThemeWithSystem() === "light" ? vscodeLight : androidstudio;

  return (
    <SyntaxHighlighter
      language={language}
      style={themeStyle as unknown as Record<string, CSSProperties>}
      className={className}
    >
      {code}
    </SyntaxHighlighter>
  );
};
