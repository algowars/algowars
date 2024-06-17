import { Button } from "@/components/ui/button";
import { useProblemEditor } from "../problem-editor.provider";

const ProblemEditorFooter = () => {
  const { runExecutable } = useProblemEditor();
  return (
    <footer className="p-3 flex items-center border-t">
      <ul className="flex items-center gap-5 ml-auto">
        <li>
          <Button className="w-24" variant="outline" onClick={runExecutable}>
            Run
          </Button>
        </li>
        <li>
          <Button className="w-24" disabled>
            Submit
          </Button>
        </li>
      </ul>
    </footer>
  );
};

export default ProblemEditorFooter;
