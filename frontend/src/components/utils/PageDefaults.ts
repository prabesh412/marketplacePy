import { initializeStore } from '@/zustand/store';
import { QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import nookies from 'nookies';
import { AXIOS_INSTANCE } from '../../../custom-instance';
import { getListingsListQueryKey } from '../../../orval/listings/listings';
import { PaginatedListingsList } from '../../../orval/model';
import { usersMeRetrieve } from '../../../orval/users/users';

export const getDefaultStore = async (
  ctx: NextPageContext | GetServerSidePropsContext,
) => {
  const accessToken = nookies.get(ctx)?.accessToken;
  let zustandStore = initializeStore();
  let profile;

  if (accessToken) {
    AXIOS_INSTANCE.interceptors.request.use(function (config) {
      delete config.headers['Authorization'];
      config.headers['Authorization'] = `Token ${accessToken}`;

      return config;
    });
    profile = await usersMeRetrieve();

    zustandStore = initializeStore({
      profile: profile,
      accessToken,
    });
  }

  return zustandStore.getState();
};

export const getDefaultHomeStore = async (
  ctx: NextPageContext | GetServerSidePropsContext,
  queryClient: QueryClient,
) => {
  const accessToken = nookies.get(ctx)?.accessToken;
  let zustandStore = initializeStore();
  const data = await queryClient.getQueryData(
    getListingsListQueryKey({ page: 1 }),
  );
  let profile;

  if (accessToken) {
    AXIOS_INSTANCE.interceptors.request.use(function (config) {
      delete config.headers['Authorization'];
      config.headers['Authorization'] = `Token ${accessToken}`;

      return config;
    });
    profile = await usersMeRetrieve();
  }
  zustandStore = initializeStore({
    profile: profile,
    accessToken,
    featuredListings: data as PaginatedListingsList,
  });

  return zustandStore.getState();
};
