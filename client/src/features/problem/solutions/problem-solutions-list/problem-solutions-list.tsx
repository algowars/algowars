import { Card } from "@/components/ui/card";
import { Submission } from "@/features/submission/models/submission.model";
import { SubmissionStatusView } from "@/features/submission/submission-status-view/submission-status-view";
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
            <div className="mb-2 flex">
              {solution?.status?.length ? (
                <h4>
                  <SubmissionStatusView status={solution.status} />
                </h4>
              ) : null}
              <p className="text-muted-foreground font-semibold ml-auto">
                CreatedBy: {solution.createdBy}
              </p>
            </div>

            <div className="overflow-hidden rounded-lg">
              <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {solution.sourceCode}
              </SyntaxHighlighter>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default ProblemSolutionsList;
