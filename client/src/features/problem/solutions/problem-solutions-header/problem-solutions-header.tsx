import { Card } from "@/components/ui/card";
import { Problem } from "../../models/problem.model";
import { Link } from "react-router-dom";
import { routerConfig } from "@/app/router-config";
import { buttonVariants } from "@/components/ui/button";

type ProblemSolutionsHeaderProps = {
  problem: Problem;
};

export const ProblemSolutionsHeader = ({
  problem,
}: ProblemSolutionsHeaderProps) => {
  return (
    <header>
      <Card className="p-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">{problem.title}</h2>
        <Link
          to={routerConfig.problem.execute(problem.slug)}
          className={buttonVariants({ variant: "default" })}
        >
          Practice Again
        </Link>
      </Card>
    </header>
  );
};
