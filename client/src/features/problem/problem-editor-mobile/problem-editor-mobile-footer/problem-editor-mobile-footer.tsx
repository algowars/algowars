import { Button } from "@/components/ui/button";
import { useAccount } from "@/features/account/account.provider";
import { SubmissionStatus } from "@/features/submission/models/submission-status";
import { Lock } from "lucide-react";
import { UseMutationResult } from "@tanstack/react-query";
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
  submissionUpdate: { status: string; stdout: string[] } | null;
};

export const MobileProblemEditorFooter = ({
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
    <footer className="py-1">
      <div className="flex justify-center items-center gap-10">
        <Button
          onClick={viewSolutions}
          variant="ghost"
          disabled={createSubmissionMutation.isPending || !isAuthenticated}
        >
          {!isAuthenticated ? <Lock size={16} className="mr-2" /> : null}
          View Solutions
        </Button>
        <Button
          onClick={() => onSubmit()}
          className="w-1/3"
          disabled={
            createSubmissionMutation.isPending ||
            !isAuthenticated ||
            submissionUpdate?.status === SubmissionStatus.POLLING
          }
        >
          {!isAuthenticated && <Lock size={16} className="mr-2" />}
          {createSubmissionMutation.isPending ? "Loading" : "Submit"}
        </Button>
      </div>
    </footer>
  );
};
