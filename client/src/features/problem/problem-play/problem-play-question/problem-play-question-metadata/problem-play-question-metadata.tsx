import TypographyH4 from "@/components/ui/typography/typography-h4";
import TypographyMuted from "@/components/ui/typography/typography-muted";
import { ProblemAggregate } from "@/features/problem/problem-aggregate.model";

type Props = {
  problemAggregate: ProblemAggregate;
};

const ProblemPlayQuestionMetadata = ({ problemAggregate }: Props) => {
  return (
    <header className="flex flex-col gap-3">
      <TypographyH4>
        {problemAggregate.problem.id}. {problemAggregate.problem.title}
      </TypographyH4>
      <ul>
        <li>
          <TypographyMuted>
            Rating: {problemAggregate.problem.rating ?? "No rating"}
          </TypographyMuted>
        </li>
      </ul>
    </header>
  );
};

export default ProblemPlayQuestionMetadata;
