import { AxiosRequestConfig } from "axios";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const createSubmission = ({
  data,
  accessToken,
}: {
  data: {
    sourceCode: string;
    problemSlug: string;
    languageId?: number;
  };
  accessToken: string;
}): Promise<string> => {
  data["languageId"] = 93;
  const config: AxiosRequestConfig = {
    url: "/api/v1/submission",
    method: "POST",
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api(config);
};

type UseCreateSubmissionOptions = {
  mutationConfig?: MutationConfig<typeof createSubmission>;
};

export const useCreateSubmission = ({
  mutationConfig,
}: UseCreateSubmissionOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["submission"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createSubmission,
  });
};
