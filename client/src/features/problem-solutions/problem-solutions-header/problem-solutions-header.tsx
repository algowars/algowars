import { Problem } from "@/features/problem/models/problem.model";

type ProblemSolutionsHeaderProps = {
  problem?: Problem;
};

export const ProblemSolutionsHeader = ({
  problem,
}: ProblemSolutionsHeaderProps) => {
  if (!problem?.title) {
    return null;
  }

  return (
    <header>
      <h3>{problem.title}</h3>
    </header>
  );
};
