import { AxiosRequestConfig } from "axios";
import { Account } from "../models/account.model";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

type UseFindAccountBySubOptions = {
  mutationConfig?: MutationConfig<typeof findAccountBySub>;
};

export const useFindAccountBySub = ({
  mutationConfig,
}: UseFindAccountBySubOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["find-account-by-sub"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: findAccountBySub,
  });
};
