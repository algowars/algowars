import { AxiosRequestConfig } from "axios";
import { Problem } from "../models/problem.model";
import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getProblemBySlug = ({
  slug,
}: {
  slug: string;
}): Promise<Problem> => {
  const config: AxiosRequestConfig = {
    url: `/api/v1/problem/find/slug/${encodeURIComponent(slug)}`,
  };

  return api(config);
};

export const getProblemBySlugQueryOptions = (slug: string) => {
  return queryOptions({
    queryKey: ["problem", slug],
    queryFn: () => getProblemBySlug({ slug }),
  });
};

type UseGetProblemBySlugOptions = {
  slug: string;
  queryConfig?: QueryConfig<typeof getProblemBySlug>;
};

export const useGetProblemBySlug = ({
  slug,
  queryConfig,
}: UseGetProblemBySlugOptions) => {
  return useQuery({
    ...getProblemBySlugQueryOptions(slug),
    ...queryConfig,
  });
};
