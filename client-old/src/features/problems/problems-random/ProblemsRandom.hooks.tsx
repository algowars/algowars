import { ErrorModel } from "@/models/ErrorModel";
import { ProblemModel } from "@/models/problem/ProblemModel";
import { problemService } from "@/services/ProblemService";
import { useEffect, useState } from "react";

export const useProblemsRandom = () => {
  const [disallowedIds] = useState<number[]>([]);
  const [problem, setProblem] = useState<ProblemModel | null>(null);
  const [error, setError] = useState<ErrorModel | null>(null);

  useEffect(() => {
    let ignore = false;

    (async () => {
      const [data, apiError] = await problemService.getRandomProblem(
        disallowedIds
      );

      if (data && !ignore) {
        setProblem(data);
      }

      if (apiError && !ignore) {
        setError(apiError);
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  return { problem, error };
};
