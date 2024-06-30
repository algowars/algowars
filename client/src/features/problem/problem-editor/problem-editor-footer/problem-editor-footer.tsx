import { Button } from "@/components/ui/button";
import { useProblemEditor } from "../problem-editor.provider";
import { useAuth0 } from "@auth0/auth0-react";

const ProblemEditorFooter = () => {
  const { runExecutable, isPending, submitExecutable } = useProblemEditor();
  const { isAuthenticated } = useAuth0();
  const isRunDisabled = !isAuthenticated || isPending;
  const isSubmitDisabled = !isAuthenticated || isPending;
  return (
    <footer className="p-3 flex items-center border-t">
      <ul className="flex items-center gap-5 ml-auto">
        <li>
          <Button
            className="w-24"
            variant="outline"
            onClick={runExecutable}
            disabled={isRunDisabled}
          >
            Run
          </Button>
        </li>
        <li>
          <Button
            className="w-24"
            disabled={isSubmitDisabled}
            onClick={submitExecutable}
          >
            Submit
          </Button>
        </li>
      </ul>
    </footer>
  );
};

export default ProblemEditorFooter;
