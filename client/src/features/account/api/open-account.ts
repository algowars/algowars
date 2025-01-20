import { api } from "@/lib/api-client";
import { z } from "zod";
import { Account } from "../models/account.model";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";

export const openAccountSchema = z.object({
  username: z
    .string()
    .min(3, "Username needs to be at least 3 characters.")
    .max(16, "Username must need to be most 16 characters"),
});

export type OpenAccountInput = z.infer<typeof openAccountSchema>;

export const openAccount = ({
  data,
  accessToken,
}: {
  data: OpenAccountInput;
  accessToken: string;
}): Promise<Account> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/account",
    method: "POST",
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return api(config);
};

type UseOpenAccountOptions = {
  mutationConfig?: MutationConfig<typeof openAccount>;
};

export const useOpenAccount = ({
  mutationConfig,
}: UseOpenAccountOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["account"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: openAccount,
  });
};
