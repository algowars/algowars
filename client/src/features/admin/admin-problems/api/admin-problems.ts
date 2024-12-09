import { PaginationResult } from "@/features/common/pagination/pagination-result";
import { Problem } from "@/features/problem/models/problem.model";
import { SubmissionStatus } from "@/features/submission/models/submission-status";
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
}): Promise<
  PaginationResult<
    Problem & {
      setupStatuses: {
        name: string;
        status: SubmissionStatus;
      }[];
    }
  >
> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/problem/statuses",
    params: {
      page,
      size,
      timestamp: timestamp.toISOString(),
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api(config);
};

export const getAdminProblemsQueryOptions = (
  page: number,
  size: number,
  timestamp: Date,
  accessToken: string
) => {
  return queryOptions({
    queryKey: ["admin-problems", page, size, timestamp, accessToken],
    queryFn: () => getAdminProblems({ page, size, timestamp, accessToken }),
  });
};

type UseGetAdminProblemsOptions = {
  page: number;
  size: number;
  timestamp: Date;
  accessToken?: string | null;
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
    ...getAdminProblemsQueryOptions(page, size, timestamp, accessToken ?? ""),
    ...queryConfig,
    enabled: !!accessToken,
  });
};
