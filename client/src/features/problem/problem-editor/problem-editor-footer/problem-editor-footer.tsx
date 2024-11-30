import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { Problem } from "../../models/problem.model";
import { routerConfig } from "@/app/router";

type ProblemEditorFooterProps = {
  onSubmit: () => void;
  problem?: Problem;
};

export const ProblemEditorFooter = ({
  onSubmit,
  problem,
}: ProblemEditorFooterProps) => {
  return (
    <footer className="flex items-center px-5 pb-5">
      <ul className="flex items-center gap-5 ml-auto">
        <li>
          <Link
            to={routerConfig.problemSolution.execute(problem?.slug ?? "")}
            className={cn(buttonVariants({ variant: "ghost" }), "w-28")}
          >
            View Solution
          </Link>
        </li>
        <li>
          <Button variant="secondary" className="w-28">
            Run
          </Button>
        </li>
        <li>
          <Button className="w-28" onClick={() => onSubmit()}>
            Submit
          </Button>
        </li>
      </ul>
    </footer>
  );
};
