import { Problem } from "../problem/models/problem.model";
import { ProblemSolutionsHeader } from "./problem-solutions-header/problem-solutions-header";

type ProblemSolutionProps = {
  problem?: Problem;
};

export const ProblemSolutions = ({ problem }: ProblemSolutionProps) => {
  if (!problem) {
    return null;
  }

  return (
    <div>
      <ProblemSolutionsHeader problem={problem} />
    </div>
  );
};
