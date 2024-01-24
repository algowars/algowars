import { useState } from "react";
import Editor from "@monaco-editor/react";

const ProblemCodeEditor = () => {
  const [code] = useState<string>(`/**
    * @param {number} n
    * @return {string[]}
    */
   var fizzBuzz = function(n) {
       
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
