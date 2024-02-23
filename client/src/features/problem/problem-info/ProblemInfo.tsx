import { Badge } from "@/components/ui/badge";
import { ProblemModel } from "@/models/problem/ProblemModel";
import Markdown from "react-markdown";

type Props = {
  problem: ProblemModel;
};
const ProblemInfo = ({ problem }: Props) => {
  return (
    <div className="p-5 flex flex-col gap-5 h-full overflow-y-scroll">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Fizz Buzz</h2>
        <ul className="flex gap-3">
          <li>
            <Badge variant="secondary">Medium</Badge>
          </li>
          <li>
            <Badge variant="secondary">Topics</Badge>
          </li>
          <li>
            <Badge variant="secondary">Companies</Badge>
          </li>
        </ul>
      </div>
      <div>
        <Markdown
          components={{
            code(props) {
              const { children } = props;
              return (
                <code className="px-1.5 border bg-slate-200 dark:bg-slate-800 rounded inline-block">
                  {children}
                </code>
              );
            },
            p: ({ children }) => <p className="mb-3">{children}</p>,
            ul: ({ children }) => (
              <ul className="list-disc ml-5 mb-4">{children}</ul>
            ),
            li: ({ children }) => <li className="mb-4">{children}</li>,
            strong: ({ children }) => (
              <strong className="font-bold">{children}</strong>
            ),
          }}
        >
          {problem.question}
        </Markdown>
      </div>
    </div>
  );
};

export default ProblemInfo;
