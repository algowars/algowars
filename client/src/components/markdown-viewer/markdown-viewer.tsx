import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  markdown: string;
  className?: string;
};

const MarkdownViewer = ({ markdown, className = "" }: Props) => {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      className={className}
      components={{
        h1({ children }) {
          return <h1 className="mb-4 text-2xl font-semibold">{children}</h1>;
        },
        h2({ children }) {
          return <h2 className="mb-4 text-xl font-semibold">{children}</h2>;
        },
        h3({ children }) {
          return <h3 className="mb-4 text-lg font-semibold">{children}</h3>;
        },
        h4({ children }) {
          return <h4 className="mb-4 text-lg font-semibold">{children}</h4>;
        },
        h5({ children }) {
          return <h5 className="mb-4 font-semibold">{children}</h5>;
        },
        h6({ children }) {
          return <h6 className="mb-4 font-semibold">{children}</h6>;
        },
        code({ children }) {
          return (
            <code className="px-1.5 border border rounded inline-block mb-4">
              {children}
            </code>
          );
        },
        p: ({ children }) => <p className="mb-4">{children}</p>,
        ul: ({ children }) => (
          <ul className="list-disc ml-5 mb-4">{children}</ul>
        ),
        li: ({ children }) => <li className="mb-4">{children}</li>,
        strong: ({ children }) => (
          <strong className="font-bold">{children}</strong>
        ),
      }}
    >
      {markdown}
    </Markdown>
  );
};

export default MarkdownViewer;
