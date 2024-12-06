import { Submission } from "@/features/submission/models/submission.model";
import { Problem } from "../models/problem.model";
import { ProblemSolutionsHeader } from "./problem-solutions-header/problem-solutions-header";
import ProblemSolutionsList from "./problem-solutions-list/problem-solutions-list";

type ProblemSolutionsContainerProps = {
  problem?: Problem;
  solutions?: Submission[];
};

export const ProblemSolutionsContainer = ({
  problem,
  solutions,
}: ProblemSolutionsContainerProps) => {
  if (!problem) {
    return null;
  }

  return (
    <div className="flex flex-col gap-5">
      <ProblemSolutionsHeader problem={problem} />
      <section>
        <ProblemSolutionsList solutions={solutions} />
      </section>
    </div>
  );
};
