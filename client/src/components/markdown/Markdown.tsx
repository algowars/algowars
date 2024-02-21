import { ReactNode } from "react";
import ReactMarkdown, { Components } from "react-markdown";

type Props = {
  content: string;
};

interface CustomComponentProps {
  children?: ReactNode;
  className?: string;
}

const Markdown = ({ content }: Props) => {
  const components: Components = {
    code({ children, ...props }: CustomComponentProps) {
      return (
        <code
          className="px-1.5 h-8 border bg-slate-200 dark:bg-slate-800 rounded inline-block"
          {...props}
        >
          {children}
        </code>
      );
    },
    p({ children }: CustomComponentProps) {
      return <p className="mb-3">{children}</p>;
    },
    ul({ children }: CustomComponentProps) {
      return <ul className="list-disc ml-5 mb-4">{children}</ul>;
    },
    li({ children }: CustomComponentProps) {
      return <li className="mb-4">{children}</li>;
    },
    strong({ children }: CustomComponentProps) {
      return <strong className="font-bold">{children}</strong>;
    },
  };

  const processedContent = content
    .replace(/\\/g, "") // Unescape escaped characters
    .split("\n") // Split by newline
    .map((line) => line.trim()) // Trim each line
    .join("\n\n");

  return (
    <ReactMarkdown components={components} className="leading-loose">
      {processedContent}
    </ReactMarkdown>
  );
};

export default Markdown;
