import { AxiosRequestConfig } from "axios";
import { useQuery } from "@tanstack/react-query";
import { ProblemModel } from "@/models/problem/ProblemModel";
import { ErrorModel } from "@/models/ErrorModel";
import api from "./api";

export const useProblemRandom = (disallowedIds?: number[]) => {
  const getRandomProblem = (): Promise<ProblemModel | null> => {
    const config: AxiosRequestConfig = {
      url: "api/v1/problem/random",
      params: {
        disallowedIds: disallowedIds ?? [],
      },
    };

    return api.callExternalApi<ProblemModel | null>({ config }, null);
  };

  return useQuery<ProblemModel | null, ErrorModel>({
    queryKey: [disallowedIds],
    queryFn: getRandomProblem,
    retry: 0,
  });
};
