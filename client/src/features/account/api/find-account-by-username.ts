import { AxiosRequestConfig } from "axios";
import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/react-query";
import { AccountProfile } from "../models/account-profile";

export const findAccountByUsername = ({
  username,
}: {
  username: string;
}): Promise<AccountProfile> => {
  const config: AxiosRequestConfig = {
    url: `/api/v1/account/find/username/${encodeURIComponent(username)}/profile`,
  };

  return api(config);
};

export const getAccountByUsernameQueryOptions = (username: string) => {
  return queryOptions({
    queryKey: ["account", username],
    queryFn: () => findAccountByUsername({ username }),
  });
};

type UseFindAccountByUsernameOptions = {
  username: string;
  queryConfig?: QueryConfig<typeof getAccountByUsernameQueryOptions>;
};

export const useFindAccountByUsername = ({
  username,
  queryConfig,
}: UseFindAccountByUsernameOptions) => {
  return useQuery({
    ...getAccountByUsernameQueryOptions(username),
    ...queryConfig,
  });
};
