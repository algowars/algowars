import { Card } from "@/components/ui/card";
import { Problem } from "../../models/problem.model";
import TypographyH4 from "@/components/ui/typography/typography-h4";
import MarkdownViewer from "@/components/markdown-viewer/markdown-viewer";
import { cn } from "@/lib/utils";

type Props = {
  problem: Problem;
  className?: string;
};

const ProblemEditorQuestion = ({ problem, className }: Props) => {
  return (
    <Card
      className={cn("p-5 flex flex-col gap-5 h-full overflow-auto", className)}
    >
      <header className="pb-5 border-b">
        <TypographyH4>{problem.title}</TypographyH4>
      </header>
      <div>
        <MarkdownViewer markdown={problem.question} />
      </div>
    </Card>
  );
};

export default ProblemEditorQuestion;
