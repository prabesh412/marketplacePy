import axios from 'axios';
import nookies from 'nookies';
import { initializeStore } from '../store/store';
import { NextPageContext } from 'next';
import { useUsersMeRetrieve, usersMeRetrieve } from '../../orval/users/users';

export const getDefaultStore = async (ctx: NextPageContext) => {
  const accessToken = nookies.get(ctx)?.accessToken;
  let zustandStore = initializeStore();
  let profile = null;
  if (accessToken) {
    profile = await usersMeRetrieve();

    zustandStore = initializeStore({
      accessToken: accessToken,
      profile: profile,
    });
  }

  return zustandStore.getState();
};
