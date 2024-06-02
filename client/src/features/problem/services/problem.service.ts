import { AxiosRequestConfig } from "axios";
import { Problem } from "../problem.model";
import api from "@/api/api";
import { ProblemAggregate } from "../problem-aggregate.model";
import { CreateProblemDto } from "@/features/create/create-problem/dtos/create-problem.dto";
import { PaginationResponse } from "@/common/pagination/pagination-response.model";

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

const getProblemsPageable = (
  page: number,
  size: number,
  timestamp: Date
): Promise<PaginationResponse<Problem>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/problem",
    params: {
      page,
      size,
      timestamp: timestamp.toISOString(),
    },
    headers: { "content-type": "application/json" },
  };

  return api.callExternalApi<PaginationResponse<Problem>>({ config });
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

const createProblem = (
  accessToken: string,
  createProblemDto: CreateProblemDto
): Promise<Problem> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/problem",
    method: "POST",
    data: createProblemDto,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.callExternalApi<Problem>({ config });
};

const problemService = {
  getRandomProblem,
  getProblemBySlug,
  getProblemsPageable,
  createProblem,
};

Object.freeze(problemService);

export { problemService };
