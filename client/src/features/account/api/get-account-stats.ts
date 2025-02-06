import { AxiosRequestConfig } from "axios";
import { AccountStats } from "../models/account-stats";
import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "@tanstack/react-query";

export const getAccountStats = ({
  accessToken,
  username,
}: {
  accessToken: string | null;
  username: string;
}): Promise<AccountStats> => {
  if (!accessToken) {
    return Promise.reject(new Error("Access token is null"));
  }

  const config: AxiosRequestConfig = {
    url: `/api/v1/account/find/username/${encodeURIComponent(username)}/stats`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api(config);
};

export const getAccountStatsQueryOptions = (
  accessToken: string | null,
  username: string
) => {
  return {
    queryKey: ["account-stats", accessToken, username],
    queryFn: () => getAccountStats({ accessToken, username }),
  };
};

type UseGetAccountStatsOptions = {
  accessToken: string | null;
  username: string;
  queryConfig?: QueryConfig<typeof getAccountStats>;
};

export const useGetAccountStats = ({
  accessToken,
  username,
  queryConfig,
}: UseGetAccountStatsOptions) => {
  return useQuery({
    ...getAccountStatsQueryOptions(accessToken, username),
    ...queryConfig,
  });
};
