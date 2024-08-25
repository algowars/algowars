import { Card } from "@/components/ui/card";
import { ProblemAggregate } from "../../models/problem-aggregate.model";
import TypographyH4 from "@/components/ui/typography/typography-h4";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import ProblemRating from "../../problem-rating/problem-rating";

type Props = {
  problemAggregate: ProblemAggregate | null | undefined;
};

const ProblemResultHeader = ({ problemAggregate }: Props) => {
  if (!problemAggregate || !problemAggregate?.problem) {
    return null;
  }

  return (
    <Card className="p-5 flex items-start gap-5">
      <div className="flex flex-col gap-2">
        <TypographyH4>{problemAggregate.problem.title}</TypographyH4>
        <ul>
          <li>
            <ProblemRating rating={problemAggregate.problem.rating} />
          </li>
        </ul>
      </div>

      <ul className="ml-auto flex items-center gap-3">
        <li>
          <Link
            to={`/problem/${encodeURIComponent(problemAggregate.problem.slug)}`}
            className={buttonVariants({ variant: "default" })}
          >
            Train Problem
          </Link>
        </li>
      </ul>
    </Card>
  );
};

export default ProblemResultHeader;
