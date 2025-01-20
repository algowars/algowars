import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { Problem } from "../models/problem.model";
import { Submission } from "@/features/submission/models/submission.model";

export const getProblemSolutionsBySlug = ({
  slug,
  accessToken,
}: {
  slug: string;
  accessToken: string;
}): Promise<{
  problem: Problem;
  submissions: Submission[];
} | null> => {
  if (!accessToken) {
    return Promise.resolve(null);
  }

  const config: AxiosRequestConfig = {
    url: `/api/v1/problem/find/slug/${encodeURIComponent(slug)}/solutions`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api(config);
};

export const getProblemSolutionsBySlugQueryOptions = (
  slug: string,
  accessToken: string
) => {
  return queryOptions({
    queryKey: ["solutions", slug, accessToken],
    queryFn: () => getProblemSolutionsBySlug({ slug, accessToken }),
  });
};

type UseGetProblemSolutionsBySlugOptions = {
  slug: string;
  accessToken: string;
  queryConfig?: QueryConfig<typeof getProblemSolutionsBySlug>;
};

export const useGetProblemSolutionsBySlug = ({
  slug,
  accessToken,
  queryConfig,
}: UseGetProblemSolutionsBySlugOptions) => {
  return useQuery({
    ...getProblemSolutionsBySlugQueryOptions(slug, accessToken),
    ...queryConfig,
  });
};
