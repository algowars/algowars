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
    <ul>
      {solutions.map((solution) => (
        <li key={solution.id}>
          <Card className="p-5">
            {solution?.statuses?.length ? (
              <h4 className="mb-2">
                <SubmissionStatusView status={solution.statuses[0]} />
              </h4>
            ) : null}
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
