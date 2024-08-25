import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { materialDark } from "@uiw/codemirror-theme-material";

type Props = {
  code: string;
  changeCode: (code: string) => void;
  id?: string;
  className?: string;
};

const CodeEditor = ({ code, changeCode, ...props }: Props) => {
  return (
    <CodeMirror
      {...props}
      value={code}
      height="100%"
      theme={materialDark}
      extensions={[javascript({ jsx: true })]}
      onChange={changeCode}
    />
  );
};

export default CodeEditor;
