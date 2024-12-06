import { Card } from "@/components/ui/card";
import { Submission } from "@/features/submission/models/submission.model";

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
          <Card>
            <p>{solution.sourceCode}</p>
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default ProblemSolutionsList;
