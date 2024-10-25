import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { z } from "zod";

export type createProblemRenderProps = {
  title: string;
  question: string;
  slug: string;
  language: number;
  initialCode: string;
  test: string;
  solution: string;
};

export const createProblemSchema = z.object({
  title: z.string().min(1).max(100),
  question: z.string().min(5).max(750),
  slug: z.string().min(1).max(110),
  language: z.number(),
  initialCode: z.string(),
  test: z.string(),
  solution: z.string(),
});

export type CreateProblemInput = z.infer<typeof createProblemSchema>;

export const createProblem = ({
  data,
  accessToken,
}: {
  data: CreateProblemInput;
  accessToken: string;
}): Promise<string> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/problem",
    method: "POST",
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api(config);
};

type UseCreateProblemOptions = {
  mutationConfig?: MutationConfig<typeof createProblem>;
};

export const useCreateProblem = ({
  mutationConfig,
}: UseCreateProblemOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["create-problem"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createProblem,
  });
};
