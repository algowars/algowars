import { AxiosRequestConfig } from "axios";
import { Rush } from "../models/rush";
import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const findSoloRushById = ({
  accessToken,
  rushId,
  startByDefault,
}: {
  accessToken: string;
  rushId: string;
  startByDefault: boolean;
}): Promise<Rush> => {
  if (!accessToken) {
    return Promise.reject("No access token available");
  }

  const config: AxiosRequestConfig = {
    url: `/api/v1/game/rush/${encodeURIComponent(rushId)}`,
    params: {
      start: startByDefault,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api(config);
};

export const findSoloRushByIdQueryOptions = (
  accessToken: string,
  rushId: string,
  startByDefault: boolean
) => {
  return queryOptions({
    queryKey: ["rush", rushId, accessToken],
    queryFn: () => findSoloRushById({ rushId, accessToken, startByDefault }),
  });
};

type UseFindSoloRushByIdOptions = {
  accessToken: string;
  rushId: string;
  startByDefault: boolean;
  queryConfig?: QueryConfig<typeof findSoloRushByIdQueryOptions>;
};

export const useFindSoloRushById = ({
  accessToken,
  rushId,
  queryConfig = {},
  startByDefault = false,
}: UseFindSoloRushByIdOptions) => {
  return useQuery({
    ...findSoloRushByIdQueryOptions(accessToken, rushId, startByDefault),
    ...queryConfig,
  });
};
