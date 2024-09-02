import { api } from '@/lib/api-client';
import { Doc } from '../models/doc.model';
import { AxiosRequestConfig } from 'axios';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { QueryConfig } from '@/lib/react-query';

export const getDoc = ({ slug }: { slug: string }): Promise<Doc> => {
  const config: AxiosRequestConfig = {
    url: 'doc',
    params: encodeURIComponent(slug),
  };
  return api(config);
};

export const getDocQueryOptions = (slug: string) => {
  return queryOptions({
    queryKey: ['doc', slug],
    queryFn: () => getDoc({ slug }),
  });
};

type UseDocOptions = {
  slug: string;
  queryConfig?: QueryConfig<typeof getDocQueryOptions>;
};

export const useDoc = ({ slug, queryConfig }: UseDocOptions) => {
  return useQuery({
    ...getDocQueryOptions(slug),
    ...queryConfig,
  });
};
