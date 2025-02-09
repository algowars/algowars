import { PaginationResult } from "@/features/common/pagination/pagination-result";
import { Problem } from "../models/problem.model";
import { AxiosRequestConfig } from "axios";
import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getProblems = ({
  page,
  size,
  timestamp,
}: {
  page: number;
  size: number;
  timestamp: Date;
}): Promise<PaginationResult<Problem>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/problem",
    params: {
      page,
      size,
      timestamp: timestamp.toISOString(),
    },
  };

  return api(config);
};

export const getProblemsQueryOptions = ({
  page,
  size,
  timestamp,
}: {
  page: number;
  size: number;
  timestamp: Date;
}) => {
  return queryOptions({
    queryKey: ["problems", page, size, timestamp],
    queryFn: () => getProblems({ page, size, timestamp }),
  });
};

type UseGetProblemsOptions = {
  page: number;
  size: number;
  timestamp: Date;
  queryConfig?: QueryConfig<typeof getProblems>;
};

export const useGetProblems = ({
  page,
  size,
  timestamp,
  queryConfig,
}: UseGetProblemsOptions) => {
  return useQuery({
    ...getProblemsQueryOptions({ page, size, timestamp }),
    ...queryConfig,
  });
};
