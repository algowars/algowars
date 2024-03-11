import { AxiosRequestConfig } from "axios";
import api from "./api";
import { ProblemModel } from "@/models/problem/ProblemModel";
import { ProblemAggregateModel } from "@/models/problem/ProblemAggregateModel";

const getRandomProblem = (disallowedIds?: number[]) => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/problem/random",
    params: {
      disallowedIds: disallowedIds ?? [],
    },
  };

  return api.callExternalApi<ProblemModel | null>({ config });
};

const getProblemAggregate = (problemSlug: string, languageId: number) => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/problem/aggregate",
    params: {
      problemSlug,
      languageId,
    },
  };

  return api.callExternalApi<ProblemAggregateModel | null>({ config });
};

const problemService = {
  getRandomProblem,
  getProblemAggregate,
};

Object.freeze(problemService);

export { problemService };
