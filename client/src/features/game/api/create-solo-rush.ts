import { AxiosRequestConfig } from "axios";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const createSoloRush = ({
  accessToken,
}: {
  accessToken: string;
}): Promise<string> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/game/rush/solo",
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api(config);
};

type UseCreateSoloRushOptions = {
  mutationConfig?: MutationConfig<typeof createSoloRush>;
};

export const useCreateSoloRush = ({
  mutationConfig,
}: UseCreateSoloRushOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["create-solo-rush"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createSoloRush,
  });
};
