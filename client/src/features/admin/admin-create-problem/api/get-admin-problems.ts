import { PaginationResult } from "@/features/common/pagination/pagination-result";
import { AdminProblem } from "@/features/problem/models/admin-problem.model";
import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";

export const getAdminProblems = ({
  page,
  size,
  timestamp,
  accessToken,
}: {
  page: number;
  size: number;
  timestamp: Date;
  accessToken: string;
}): Promise<PaginationResult<AdminProblem>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/account/admin/problems",
    params: {
      page,
      size,
      timestamp,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api(config);
};

export const getAdminProblemsQueryOptions = ({
  page,
  size,
  timestamp,
  accessToken,
}: {
  page: number;
  size: number;
  timestamp: Date;
  accessToken: string;
}) => {
  return queryOptions({
    queryKey: ["admin-problems", page, size, timestamp, accessToken],
    queryFn: () => getAdminProblems({ page, size, timestamp, accessToken }),
  });
};

type UseGetAdminProblemsOptions = {
  page: number;
  size: number;
  timestamp: Date;
  accessToken: string;
  queryConfig?: QueryConfig<typeof getAdminProblems>;
};

export const useGetAdminProblems = ({
  page,
  size,
  timestamp,
  accessToken,
  queryConfig,
}: UseGetAdminProblemsOptions) => {
  return useQuery({
    ...getAdminProblemsQueryOptions({ page, size, timestamp, accessToken }),
    ...queryConfig,
  });
};
