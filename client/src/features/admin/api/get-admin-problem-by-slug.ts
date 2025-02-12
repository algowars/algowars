import { AdminProblem } from "@/features/problem/models/admin-problem.model";
import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";

export const getAdminProblemBySlug = ({
  slug,
  accessToken,
}: {
  slug: string;
  accessToken: string;
}): Promise<AdminProblem> => {
  const config: AxiosRequestConfig = {
    url: `/api/v1/account/admin/problem/find/slug/${encodeURIComponent(slug)}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api(config);
};

export const getAdminProblemsBySlugQueryOptions = ({
  slug,
  accessToken,
}: {
  slug: string;
  accessToken: string;
}) => {
  return queryOptions({
    queryKey: ["admin-problem", slug, accessToken],
    queryFn: () => getAdminProblemBySlug({ slug, accessToken }),
  });
};

type UseGetAdminProblemBySlugOptions = {
  slug: string;
  accessToken: string;
  queryConfig?: QueryConfig<typeof getAdminProblemBySlug>;
};

export const useGetAdminProblemBySlug = ({
  slug,
  accessToken,
  queryConfig,
}: UseGetAdminProblemBySlugOptions) => {
  return useQuery({
    ...getAdminProblemsBySlugQueryOptions({ slug, accessToken }),
    ...queryConfig,
  });
};
