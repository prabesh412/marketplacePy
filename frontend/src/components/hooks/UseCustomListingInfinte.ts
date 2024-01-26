import {
  QueryFunction,
  QueryKey,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';
import {
  getListingsListQueryKey,
  listingsList,
} from '../../../orval/listings/listings';
import { ListingsListParams } from '../../../orval/model';

export const getListingsListInfiniteQueryOptions = <
  TData = Awaited<ReturnType<typeof listingsList>>,
  TError = unknown,
>(
  params?: ListingsListParams,
  options?: {
    query?: UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof listingsList>>,
      TError,
      TData
    >;
  },
): UseInfiniteQueryOptions<
  Awaited<ReturnType<typeof listingsList>>,
  TError,
  TData
> & { queryKey: QueryKey } => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getListingsListQueryKey('listing-infinite' as ListingsListParams);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof listingsList>>> = ({
    signal,
  }) => listingsList(params, signal);

  return {
    queryKey,
    queryFn,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    retry: 2,
    ...queryOptions,
  };
};

export type ListingsListInfiniteQueryResult = NonNullable<
  Awaited<ReturnType<typeof listingsList>>
>;
export type ListingsListInfiniteQueryError = unknown;

export const useCustomListingsListInfinite = <
  TData = Awaited<ReturnType<typeof listingsList>>,
  TError = unknown,
>(
  params?: ListingsListParams,
  options?: {
    query?: UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof listingsList>>,
      TError,
      TData
    >;
  },
): UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getListingsListInfiniteQueryOptions(params, options);

  const query = useInfiniteQuery(queryOptions) as UseInfiniteQueryResult<
    TData,
    TError
  > & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
};

