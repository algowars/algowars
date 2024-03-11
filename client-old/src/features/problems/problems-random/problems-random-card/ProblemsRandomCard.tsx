import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ProblemModel } from "@/models/problem/ProblemModel";
import Markdown from "@/components/markdown/Markdown";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppSelector";

type Props = {
  problem: ProblemModel;
};

const ProblemsRandomCard = ({ problem }: Props) => {
  const { preferredLanguage } = useAppSelector(
    (state) => state.preferredLanguage
  );

  return (
    <Card className="p-5 flex flex-col gap-5">
      <h3 className="text-xl font-semibold">{problem.title}</h3>
      <div className="overflow-y-scroll max-h-32">
        <Markdown content={problem.question ?? ""} />
      </div>
      <ul className="flex gap-5 items-center">
        <li>
          <Link
            to={`/problem/${problem.titleSlug}?language=${preferredLanguage.id}`}
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
