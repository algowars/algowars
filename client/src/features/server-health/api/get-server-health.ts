import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { ServerHealth } from "../server-health";

export const getServerHealth = (): Promise<ServerHealth> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/health",
  };

  return api(config);
};

export const getServerHealthQueryOptions = () => {
  return {
    queryKey: ["server-health"],
    queryFn: () => getServerHealth(),
  };
};

type UseGetServerHealthOptions = {
  queryConfig?: QueryConfig<typeof getServerHealthQueryOptions>;
};

export const useGetServerHealth = ({
  queryConfig,
}: UseGetServerHealthOptions) => {
  return useQuery({
    ...getServerHealthQueryOptions(),
    ...queryConfig,
  });
};
