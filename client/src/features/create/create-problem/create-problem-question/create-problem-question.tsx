import MarkdownEditor from "@/components/markdown-editor/markdown-editor";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const CreateProblemQuestion = () => {
  const [question, setQuestion] = useState<string>("");
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="question">Question</Label>
      <MarkdownEditor id="question" />
    </div>
  );
};

export default CreateProblemQuestion;
