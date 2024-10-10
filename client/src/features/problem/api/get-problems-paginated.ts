import { PaginationResult } from "@/features/common/pagination/pagination-result";
import { Problem } from "../models/problem.model";
import { AxiosRequestConfig } from "axios";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const getProblemsPaginated = ({
  page,
  size,
  timestamp,
}: {
  page: number;
  size: number;
  timestamp: Date;
}): Promise<PaginationResult<Problem>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/problem",
    params: {
      page,
      size,
      timestamp: timestamp.toISOString(),
    },
  };

  return api(config);
};

type UseGetProblemsPaginatedOptions = {
  mutationConfig?: MutationConfig<typeof getProblemsPaginated>;
};

export const useGetProblemsPaginated = ({
  mutationConfig,
}: UseGetProblemsPaginatedOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["get-problems-paginated"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: getProblemsPaginated,
  });
};
