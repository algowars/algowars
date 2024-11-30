import { AxiosRequestConfig } from "axios";
import { Account } from "../models/account.model";
import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const findAccountBySub = ({
  accessToken,
}: {
  accessToken: string;
}): Promise<Account> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/account/find/sub",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api(config);
};

export const findAccountBySubQueryOptions = (accessToken: string) => {
  return queryOptions({
    queryKey: ["account", accessToken],
    queryFn: () => findAccountBySub({ accessToken }),
  });
};

type UseFindAccountBySubOptions = {
  accessToken: string;
  queryConfig?: QueryConfig<typeof findAccountBySubQueryOptions>;
};

export const useFindAccountBySub = ({
  accessToken,
  queryConfig,
}: UseFindAccountBySubOptions) => {
  return useQuery({
    ...findAccountBySubQueryOptions(accessToken),
    ...queryConfig,
  });
};
