import MarkdownEditor from "@/components/markdown-editor/markdown-editor";
import { Label } from "@/components/ui/label";
import { useCreateProblem } from "../create-problem.provider";

const CreateProblemQuestion = () => {
  const { createProblem, changeCreateProblem } = useCreateProblem();

  const changeQuestion = (value: string) => {
    changeCreateProblem("question", value);
  };

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="question">Question</Label>
      <MarkdownEditor
        id="question"
        markdown={createProblem.question}
        changeMarkdown={changeQuestion}
      />
    </div>
  );
};

export default CreateProblemQuestion;
