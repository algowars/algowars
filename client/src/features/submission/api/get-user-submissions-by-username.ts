import { AxiosRequestConfig } from "axios";
import { Submission } from "../models/submission.model";
import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/react-query";

export interface UserSubmissionAggregate extends Submission {
  problem: {
    id: string;
    title: string;
    slug: string;
  };
}

export const getUserSubmissionsByUsername = ({
  username,
}: {
  username: string;
}): Promise<{
  submissions: UserSubmissionAggregate[];
}> => {
  const config: AxiosRequestConfig = {
    url: `/api/v1/submission/username/${encodeURIComponent(username)}`,
  };

  return api(config);
};

export const getUserSubmissionByUsernameQueryOptions = (username: string) => {
  return queryOptions({
    queryKey: ["submissions", username],
    queryFn: () => getUserSubmissionsByUsername({ username }),
  });
};

type UseGetUserSubmissionsByUsernameOptions = {
  username: string;
  queryConfig?: QueryConfig<typeof getUserSubmissionsByUsername>;
};

export const useGetUserSubmissionsByUsername = ({
  username,
  queryConfig,
}: UseGetUserSubmissionsByUsernameOptions) => {
  return useQuery({
    ...getUserSubmissionByUsernameQueryOptions(username),
    ...queryConfig,
  });
};
