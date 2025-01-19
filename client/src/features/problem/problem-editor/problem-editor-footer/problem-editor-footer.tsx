import { Button } from "@/components/ui/button";
import { useAccount } from "@/features/account/account.provider";
import { SubmissionStatus } from "@/features/submission/models/submission-status";
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
  submissionUpdate: {
    status: string;
    stdout: string[];
  } | null;
};

export const ProblemEditorFooter = ({
  onSubmit,
  createSubmissionMutation,
  submissionUpdate,
}: ProblemEditorFooterProps) => {
  const { isAuthenticated } = useAccount();
  const navigate = useNavigate();

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
        <li>
          <Button
            className="w-28"
            onClick={() => onSubmit()}
            disabled={
              createSubmissionMutation.isPending ||
              !isAuthenticated ||
              submissionUpdate?.status === SubmissionStatus.POLLING
            }
          >
            {!isAuthenticated ? <Lock size={16} className="mr-2" /> : null}
            {createSubmissionMutation.isPending ? "Loading" : "Submit"}
          </Button>
        </li>
      </ul>
    </footer>
  );
};
