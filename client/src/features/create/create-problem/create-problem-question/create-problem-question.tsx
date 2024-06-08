import MarkdownEditor from "@/components/markdown-editor/markdown-editor";
import { useState } from "react";

const CreateProblemQuestion = () => {
  const [question, setQuestion] = useState<string>("");
  return <MarkdownEditor />;
};

export default CreateProblemQuestion;
