import CodeEditor from "@/components/code-editor/code-editor";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const CreateProblemInitialCode = () => {
  const [code, setCode] = useState<string>(`const test = () => {
    //code goes here
}`);

  const changeCode = (value: string) => {
    setCode(value);
  };

  return (
    <div className="flex flex-col gap-3">
      <Label>Initial Code</Label>
      <CodeEditor code={code} changeCode={changeCode} />
    </div>
  );
};

export default CreateProblemInitialCode;
