import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { UseMutationResult } from "@tanstack/react-query";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

type ProblemEditorFooterProps = {
  onSubmit: () => void;
  createSubmissionMutation: UseMutationResult<
    string,
    Error,
    {
      data: {
        sourceCode: string;
        problemSlug: string;
        languageId?: number;
      };
      accessToken: string;
    },
    unknown
  >;
};

export const ProblemEditorFooter = ({
  onSubmit,
  createSubmissionMutation,
}: ProblemEditorFooterProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  const viewSolutions = () => {
    navigate("solutions");
  };

  return (
    <footer className="flex items-center px-5 pb-5">
      <ul className="flex items-center gap-5 ml-auto">
        <li>
          <Button
            onClick={viewSolutions}
            variant="ghost"
            disabled={createSubmissionMutation.isPending || !isAuthenticated}
          >
            {!isAuthenticated ? <Lock size={16} className="mr-2" /> : null}
            View Solutions
          </Button>
        </li>
        {/* <li>
          <Button variant="secondary" className="w-28">
            Run
          </Button>
        </li> */}
        <li>
          <Button
            className="w-28"
            onClick={() => onSubmit()}
            disabled={createSubmissionMutation.isPending || !isAuthenticated}
          >
            {!isAuthenticated ? <Lock size={16} className="mr-2" /> : null}
            {createSubmissionMutation.isPending ? "Loading" : "Submit"}
          </Button>
        </li>
      </ul>
    </footer>
  );
};
