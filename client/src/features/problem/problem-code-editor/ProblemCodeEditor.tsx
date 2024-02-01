import Editor from "@monaco-editor/react";

type Props = {
  code: string;
  changeCode: (value: string | undefined) => void;
};

const ProblemCodeEditor = ({ code, changeCode }: Props) => {
  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      value={code}
      onChange={changeCode}
      theme="vs-dark"
    />
  );
};

export default ProblemCodeEditor;
