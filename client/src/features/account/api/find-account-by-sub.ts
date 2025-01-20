import { AxiosRequestConfig } from "axios";
import { Account } from "../models/account.model";
import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "@tanstack/react-query";

export const findAccountBySub = ({
  accessToken,
}: {
  accessToken: string | null;
}): Promise<Account> => {
  if (!accessToken) {
    return Promise.reject(new Error("Access token is null"));
  }

  const config: AxiosRequestConfig = {
    url: "/api/v1/account/find/sub",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api(config);
};

export const getAccountBySubQueryOptions = (accessToken: string | null) => {
  return {
    queryKey: ["accountBySub", accessToken],
    queryFn: () => findAccountBySub({ accessToken }),
  };
};

type UseFindAccountBySubOptions = {
  accessToken: string | null;
  queryConfig?: QueryConfig<typeof findAccountBySub>;
};

export const useFindAccountBySub = ({
  accessToken,
  queryConfig,
}: UseFindAccountBySubOptions) => {
  return useQuery({
    ...getAccountBySubQueryOptions(accessToken),
    ...queryConfig,
  });
};
