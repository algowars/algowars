import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ProblemModel } from "@/models/problem/ProblemModel";
import Markdown from "@/components/markdown/Markdown";
import { Link } from "react-router-dom";

type Props = {
  problem: ProblemModel;
};

const ProblemsRandomCard = ({ problem }: Props) => {
  return (
    <Card className="p-5 flex flex-col gap-5">
      <h3 className="text-xl font-semibold">{problem.title}</h3>
      <div className="overflow-y-hidden max-h-64">
        <Markdown content={problem.question ?? ""} />
      </div>
      <ul className="flex gap-5 items-center">
        <li>
          <Link
            to={`/problem/${problem.titleSlug}`}
            className={cn(buttonVariants({ variant: "default" }), "w-20")}
          >
            Practice
          </Link>
        </li>
        <li>
          <Button variant="outline" className="w-20">
            Skip
          </Button>
        </li>
      </ul>
    </Card>
  );
};

export default ProblemsRandomCard;
