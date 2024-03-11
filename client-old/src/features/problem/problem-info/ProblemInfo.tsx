import { Badge } from "@/components/ui/badge";
import { ProblemModel } from "@/models/problem/ProblemModel";
import Markdown from "@/components/markdown/Markdown";

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
        <Markdown content={problem.question ?? ""} />
      </div>
    </div>
  );
};

export default ProblemInfo;
