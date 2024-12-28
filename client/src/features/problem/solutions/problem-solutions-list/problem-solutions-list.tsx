import { Card } from "@/components/ui/card";
import { Submission } from "@/features/submission/models/submission.model";
import { SubmissionStatusView } from "@/features/submission/submission-status-view/submission-status-view";
import dayjs from "dayjs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

type ProblemSolutionsListProps = {
  solutions?: Submission[];
};

const ProblemSolutionsList = ({ solutions }: ProblemSolutionsListProps) => {
  if (!Array.isArray(solutions) || !solutions.length) {
    return (
      <div>
        <Card className="p-5">
          <p>No Submissions Found</p>
        </Card>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-5">
      {solutions.map((solution) => (
        <li key={solution.id}>
          <Card className="p-5">
            <div className="flex justify-between items-center mb-2">
              {solution.createdBy ? (
                <h4 className="text-muted-foreground">
                  {solution.createdBy.username}
                </h4>
              ) : null}
              {solution?.status ? (
                <h4>
                  <SubmissionStatusView status={solution.status} />
                </h4>
              ) : null}
            </div>

            <div className="overflow-hidden rounded-lg mb-2">
              <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {solution.sourceCode}
              </SyntaxHighlighter>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-semibold">
                {dayjs(solution.createdAt).format("MM/DD/YY")}
              </p>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default ProblemSolutionsList;
