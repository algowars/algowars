import { ErrorModel } from "@/models/ErrorModel";
import { SubmissionModel } from "@/models/SubmissionModel";
import { ProblemModel } from "@/models/problem/ProblemModel";
import { ProblemSetupModel } from "@/models/problem/problem-setup/ProblemSetupModel";
import { problemService } from "@/services/ProblemService";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export const useProblemPage = () => {
  const { problemSlug } = useParams();
  const [searchParams] = useSearchParams();
  const [setup, setSetup] = useState<ProblemSetupModel | null>(null);
  const [problem, setProblem] = useState<ProblemModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorModel | null>(null);
  const [submissionResult] = useState<SubmissionModel | null>(null);

  const languageId = searchParams.get("language");

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);

    (async () => {
      if (problemSlug && languageId) {
        const [data, apiError] = await problemService.getProblemAggregate(
          problemSlug,
          +languageId
        );

        if (data && !ignore) {
          setProblem(data.problem);
          setSetup(data.problemSetup);
        }

        if (apiError && !ignore) {
          setError(apiError);
        }
      }
    })();

    setIsLoading(false);

    return () => {
      ignore = true;
    };
  }, [languageId, problemSlug]);

  const submitCode = async () => {};

  return {
    isLoading,
    error,
    submitCode,
    submissionResult,
    problem,
    setup,
  };
};
