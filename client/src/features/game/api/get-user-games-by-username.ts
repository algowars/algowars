import { AxiosRequestConfig } from "axios";
import { Game } from "../models/game";
import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/react-query";

export const getUserGamesByUsername = ({
  username,
  page,
  size,
  timestamp,
}: {
  username: string;
  page: number;
  size: number;
  timestamp: Date;
}): Promise<Game[]> => {
  const config: AxiosRequestConfig = {
    url: `/api/v1/games/username/${encodeURIComponent(username)}`,
    params: {
      page,
      size,
      timestamp,
    },
  };

  return api(config);
};

export const getUserGamesByUsernameQueryOptions = ({
  username,
  page,
  size,
  timestamp,
}: {
  username: string;
  page: number;
  size: number;
  timestamp: Date;
}) => {
  return queryOptions({
    queryKey: ["user-games", username, page, size, timestamp],
    queryFn: () => getUserGamesByUsername({ username, page, size, timestamp }),
  });
};

type UseGetUserGamesByUsernameOptions = {
  username: string;
  page: number;
  size: number;
  timestamp: Date;
  queryConfig?: QueryConfig<typeof getUserGamesByUsername>;
};

export const useGetUserGamesByUsername = ({
  username,
  page,
  size,
  timestamp,
  queryConfig,
}: UseGetUserGamesByUsernameOptions) => {
  return useQuery({
    ...getUserGamesByUsernameQueryOptions({ username, page, size, timestamp }),
    ...queryConfig,
  });
};
