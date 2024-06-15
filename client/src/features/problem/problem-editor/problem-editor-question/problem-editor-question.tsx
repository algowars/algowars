import { Card } from "@/components/ui/card";
import { Problem } from "../../models/problem.model";
import TypographyH4 from "@/components/ui/typography/typography-h4";
import MarkdownViewer from "@/components/markdown-viewer/markdown-viewer";

type Props = {
  problem: Problem;
};

const ProblemEditorQuestion = ({ problem }: Props) => {
  return (
    <Card className="p-5 flex flex-col gap-5 h-full overflow-auto">
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
