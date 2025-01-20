import SyntaxHighlighter from "react-syntax-highlighter";
import { androidstudio } from "react-syntax-highlighter/dist/esm/styles/hljs";

type CodeBlockProps = {
  code?: string;
  className?: string;
};

export const CodeBlock = ({ code = "", className = "" }: CodeBlockProps) => {
  return (
    <SyntaxHighlighter
      language="javascript"
      style={androidstudio}
      className={className}
    >
      {code}
    </SyntaxHighlighter>
  );
};
