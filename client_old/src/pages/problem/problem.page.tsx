import PageLoader from "@/components/loader/page-loader/page-loader";
import { EvaluationService } from "@/features/evaluation/services/evaluation.service";
import ProblemEditor from "@/features/problem/problem-editor/problem-editor";
import ProblemEditorFooter from "@/features/problem/problem-editor/problem-editor-footer/problem-editor-footer";
import { ProblemEditorProvider } from "@/features/problem/problem-editor/problem-editor.provider";
import { ProblemService } from "@/features/problem/services/problem.service";
import { SubmissionResult } from "@/features/submission-result/models/submission-result.model";
import { SubmissionResultService } from "@/features/submission-result/services/submission-result.service";
import LayoutProblem from "@/layout/layout-problem/layout-problem";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const isSubmissionFinished = (submissionResult: SubmissionResult): boolean => {
  const IN_QUEUE_STATUS = 1;
  const PROCESSING_STATUS = 2;

  if (!submissionResult?.testcases) {
    return true;
  }

  let isFinished = true;

  submissionResult.testcases.forEach((testcase) => {
    if (!testcase?.statusId) {
      isFinished = false;
    }

    if (testcase?.statusId === IN_QUEUE_STATUS) {
      isFinished = false;
    }

    if (testcase?.statusId === PROCESSING_STATUS) {
      isFinished = false;
    }
  });

  return isFinished;
};

const ProblemPage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const { slug } = useParams();

  const [sourceCode, setSourceCode] = useState<string>("");
  const [pollingId, setPollingId] = useState<string>("");
  const [submissionResult, setSubmissionResult] =
    useState<SubmissionResult | null>(null);

  const changeSourceCode = (val: string) => {
    setSourceCode(val);
  };

  const {
    data: problemAggregate,
    isPending,
    error,
  } = useQuery({
    queryKey: [slug],
    queryFn: async () => {
      if (slug) {
        const problem =
          await ProblemService.getInstance().findProblemAggregateBySlug(slug);

        if (problem.initialCode) {
          setSourceCode(problem.initialCode);
        }

        return problem;
      }
      return null;
    },
  });

  const {
    mutate: testCode,
    error: testError,
    isPending: isTestPending,
  } = useMutation({
    mutationKey: ["run-test"],
    mutationFn: async () => {
      const accessToken = await getAccessTokenSilently();

      setPollingId("");
      setSubmissionResult(null);

      const submissionId =
        await EvaluationService.getInstance().createAnonymous(
          accessToken,
          slug ?? "",
          sourceCode
        );

      if (submissionId) {
        setPollingId(submissionId);
      }
    },
  });

  const {
    mutate: submitCode,
    error: submitError,
    isPending: isSubmitPending,
  } = useMutation({
    mutationKey: ["submit"],
    mutationFn: async () => {
      const accessToken = await getAccessTokenSilently();

      setPollingId("");
      setSubmissionResult(null);

      const submissionId = await EvaluationService.getInstance().create(
        accessToken,
        slug ?? "",
        sourceCode
      );

      if (submissionId) {
        setPollingId(submissionId);
      }
    },
  });

  const { isPending: isPollingPending, error: pollingError } = useQuery({
    queryKey: ["poll-submission", pollingId],
    refetchInterval: () => (pollingId ? 2_000 : false),
    queryFn: async () => {
      if (!pollingId) {
        return null;
      }

      const accessToken = await getAccessTokenSilently();

      const result =
        await SubmissionResultService.getInstance().getPollSubmission(
          accessToken,
          pollingId
        );

      if (result?.isSubmission && result?.isAccepted) {
        navigate("result");
      }

      if (isSubmissionFinished(result)) {
        setSubmissionResult(result);
        setPollingId("");
      }
      return null;
    },
  });

  useEffect(() => {
    if (error?.message) {
      toast.error(`Error getting the problem "${slug}"`, {
        description: error.message,
      });
    }

    if (testError?.message) {
      toast.error("Error running tests", {
        description: testError.message,
      });
    }

    if (pollingError?.message) {
      toast.error("Error submitting solution", {
        description: pollingError.message,
      });
    }

    if (submitError?.message) {
      toast.error("Error submitting solution", {
        description: submitError.message,
      });
    }
  }, [
    error?.message,
    slug,
    pollingError?.message,
    submitError?.message,
    testError?.message,
  ]);

  const isAllPending = isPollingPending || isTestPending || isSubmitPending;

  if (isPending) {
    return <PageLoader />;
  }

  return (
    <LayoutProblem>
      {problemAggregate ? (
        <div className="flex flex-col h-full">
          <ProblemEditorProvider
            runExecutable={testCode}
            submitExecutable={submitCode}
            sourceCode={sourceCode}
            changeSourceCode={changeSourceCode}
            submissionResult={submissionResult}
            pollingId={pollingId}
            isPending={isAllPending}
          >
            <div className="grow pb-5 px-5">
              <ProblemEditor problemAggregate={problemAggregate} />
            </div>

            <ProblemEditorFooter />
          </ProblemEditorProvider>
        </div>
      ) : null}
    </LayoutProblem>
  );
};

export default ProblemPage;
