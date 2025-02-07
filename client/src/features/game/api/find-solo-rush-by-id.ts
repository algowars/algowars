import { AxiosRequestConfig } from "axios";
import { Rush } from "../models/rush";
import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const findSoloRushById = ({
  accessToken,
  rushId,
}: {
  accessToken: string;
  rushId: string;
}): Promise<Rush> => {
  const config: AxiosRequestConfig = {
    url: `/api/v1/game/rush/${encodeURIComponent(rushId)}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api(config);
};

export const findSoloRushByIdQueryOptions = (
  accessToken: string,
  rushId: string
) => {
  return queryOptions({
    queryKey: ["rush", rushId, accessToken],
    queryFn: () => findSoloRushById({ rushId, accessToken }),
  });
};

type UseFindSoloRushByIdOptions = {
  accessToken: string;
  rushId: string;
  queryConfig: QueryConfig<typeof findSoloRushById>;
};

export const useFindSoloRushById = ({
  accessToken,
  rushId,
  queryConfig,
}: UseFindSoloRushByIdOptions) => {
  return useQuery({
    ...findSoloRushByIdQueryOptions(accessToken, rushId),
    ...queryConfig,
  });
};
