import { AxiosRequestConfig } from "axios";
import { ProblemCreationModel } from "../models/problem-creation.model";
import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { queryConfig, QueryConfig } from "@/lib/react-query";

export const getInitialProblemCreation = ({
  languageId,
  accessToken,
}: {
  languageId: number;
  accessToken: string;
}): Promise<ProblemCreationModel> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/problem/create/setup",
    params: {
      languageId,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api(config);
};

export const getInitialProblemCreationQueryOptions = (
  languageId: number,
  accessToken: string
) => {
  return queryOptions({
    queryKey: ["initial-problem", languageId],
    queryFn: () => getInitialProblemCreation({ languageId, accessToken }),
  });
};

type UseGetInitialProblemCreationOptions = {
  languageId: number;
  accessToken?: string | null;
  queryConfig?: QueryConfig<typeof getInitialProblemCreation>;
};

export const useGetInitialProblemCreation = ({
  languageId,
  accessToken,
}: UseGetInitialProblemCreationOptions) => {
  return useQuery({
    ...getInitialProblemCreationQueryOptions(languageId, accessToken ?? ""),
    ...queryConfig,
    enabled: !!accessToken,
  });
};
