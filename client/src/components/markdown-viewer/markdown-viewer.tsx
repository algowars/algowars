import Markdown from "react-markdown";

type Props = {
  markdown: string;
  className?: string;
};

const MarkdownViewer = ({ markdown, className = "" }: Props) => {
  return (
    <Markdown
      className={className}
      components={{
        h1({ children }) {
          return (
            <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {children}
            </h1>
          );
        },
        h2({ children }) {
          return (
            <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {children}
            </h2>
          );
        },
        h3({ children }) {
          return (
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {children}
            </h3>
          );
        },
        h4({ children }) {
          return (
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {children}
            </h4>
          );
        },
        h5({ children }) {
          return (
            <h5 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {children}
            </h5>
          );
        },
        h6({ children }) {
          return (
            <h6 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {children}
            </h6>
          );
        },
        code({ children }) {
          return (
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              {children}
            </code>
          );
        },
        p: ({ children }) => (
          <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
        ),
        strong: ({ children }) => (
          <strong className="font-bold leading-5 tracking-wide">
            {children}
          </strong>
        ),
        blockquote: ({ children }) => (
          <blockquote className="mt-6 border-l-2 pl-6 italic">
            {children}
          </blockquote>
        ),
        table: ({ children }) => <table className="w-full">{children}</table>,
        tr: ({ children }) => (
          <table className="m-0 border-t p-0 even:bg-muted">{children}</table>
        ),
        th: ({ children }) => (
          <table className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
            {children}
          </table>
        ),
        td: ({ children }) => (
          <table className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
            {children}
          </table>
        ),
        small: ({ children }) => (
          <table className="text-sm font-medium leading-none">{children}</table>
        ),
      }}
    >
      {markdown}
    </Markdown>
  );
};

export default MarkdownViewer;
