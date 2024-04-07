import { AxiosRequestConfig } from "axios";
import { Problem } from "../problem.model";
import api from "@/api/api";
import { ProblemAggregate } from "../problem-aggregate.model";

const getRandomProblem = (disallowedIds: number[]): Promise<Problem> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/problem/random",
    params: {
      disallowedIds,
    },
    headers: { "content-type": "application/json" },
  };

  return api.callExternalApi<Problem>({ config });
};

const getProblemBySlug = (problemSlug: string): Promise<ProblemAggregate> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/problem/aggregate",
    params: {
      problemSlug,
    },
    headers: { "content-type": "application/json" },
  };

  return api.callExternalApi<ProblemAggregate>({ config });
};

const problemService = {
  getRandomProblem,
  getProblemBySlug,
};

Object.freeze(problemService);

export { problemService };
