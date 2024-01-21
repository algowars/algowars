import { useState } from "react";
import Editor from "@monaco-editor/react";

const ProblemCodeEditor = () => {
  const [code] =
    useState<string>(`function twoSum(nums: number[], target: number): number[] {
    
  };`);

  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      defaultValue={code}
      theme="vs-dark"
    />
  );
};

export default ProblemCodeEditor;
