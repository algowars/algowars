import { AxiosRequestConfig } from "axios";
import { Problem } from "../models/problem.model";
import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/react-query";

export const getProblemSolutions = ({
  slug,
  accessToken,
}: {
  slug: string;
  accessToken: string;
}): Promise<{
  problem: Problem;
}> => {
  const config: AxiosRequestConfig = {
    url: `/api/v1/problem/find/slug/${encodeURIComponent(slug)}/solutions`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api(config);
};

export const getProblemSolutionsQueryOptions = (
  slug: string,
  accessToken: string
) => {
  return queryOptions({
    queryKey: ["problem-solutions", slug, accessToken],
    queryFn: () => getProblemSolutions({ slug, accessToken }),
  });
};

type UseGetProblemSolutionsOptions = {
  slug: string;
  accessToken: string;
  queryConfig?: QueryConfig<typeof getProblemSolutions>;
};

export const useGetProblemSolutions = ({
  slug,
  accessToken,
  queryConfig,
}: UseGetProblemSolutionsOptions) => {
  return useQuery({
    ...getProblemSolutionsQueryOptions(slug, accessToken),
    ...queryConfig,
  });
};
