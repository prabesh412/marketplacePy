import axios from 'axios';
import nookies from 'nookies';
import { initializeStore, useStore } from '../store/store';
import { NextPageContext } from 'next';
import { useUsersMeRetrieve, usersMeRetrieve } from '../../orval/users/users';
import { AXIOS_INSTANCE } from '../../orval/api/custom-instance';

export const getDefaultStore = async (ctx: NextPageContext) => {
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
    });
  }

  return zustandStore.getState();
};
